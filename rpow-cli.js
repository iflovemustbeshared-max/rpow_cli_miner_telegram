#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const net = require("net");
const os = require("os");
const path = require("path");
const readline = require("readline");
const { spawn } = require("child_process");
const tls = require("tls");
const { Worker } = require("worker_threads");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

async function getGmailAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GMAIL_CLIENT_ID,
      client_secret: GMAIL_CLIENT_SECRET,
      refresh_token: GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function findMagicLinkInGmail() {
  if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) return null;
  try {
    const accessToken = await getGmailAccessToken();
    const listRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?q=from:rpow2.com&maxResults=5", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const listData = await listRes.json();
    if (!listData.messages) return null;

    for (const msg of listData.messages) {
      const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const msgData = await msgRes.json();
      const body = Buffer.from(msgData.payload.parts?.[0]?.body?.data || msgData.payload.body?.data || "", "base64").toString();
      const match = body.match(/https:\/\/api\.rpow2\.com\/auth\/confirm\?token=[a-zA-Z0-9._-]+/);
      if (match) return match[0];
    }
  } catch (err) {
    console.error("Gmail API Error:", err.message);
  }
  return null;
}

async function sendTelegramAlert(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Telegram API Error:", JSON.stringify(errorData));
    }
  } catch (err) {
    console.error("Failed to send Telegram alert:", err.message);
  }
}

async function checkTelegramUpdates(client, target, minted) {
  if (!TELEGRAM_BOT_TOKEN) return;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.ok && data.result.length > 0) {
      const lastUpdate = data.result[data.result.length - 1];
      const message = lastUpdate.message;
      if (!message || !message.text) return;

      // Simple rate limiting or state to avoid processing same message
      if (client.lastTelegramUpdateId === lastUpdate.update_id) return;
      client.lastTelegramUpdateId = lastUpdate.update_id;

      const text = message.text.toLowerCase();
      if (text === "/status") {
        const me = await client.api("GET", "/me").catch(() => ({ email: "Unknown", balance: 0 }));
        const currentMinted = client.state.minted_count || minted;
        await sendTelegramAlert(`📊 <b>Status Miner:</b>\n\n<b>Email:</b> ${me.email}\n<b>Balance:</b> ${me.balance} RPOW\n<b>Progress:</b> ${currentMinted}/${target}\n<b>Engine:</b> ${process.env.RPOW_ENGINE || "node"}`);
      } else if (text === "/stop") {
        await sendTelegramAlert("🛑 <b>Mining dihentikan oleh Master!</b>");
        process.exit(0);
      } else if (text === "/balance") {
        const me = await client.api("GET", "/me").catch(() => ({ balance: 0 }));
        await sendTelegramAlert(`💰 <b>Balance Saat Ini:</b> ${me.balance} RPOW`);
      }
    }
  } catch (err) {
    // Silently fail for background checks
  }
}

const DEFAULT_SITE_ORIGIN = "https://rpow2.com";
const DEFAULT_API_ORIGIN = "https://api.rpow2.com";
const DEFAULT_INDEX = path.join(__dirname, "index.js");
const DEFAULT_STATE = path.join(__dirname, ".rpow-cli-state.json");
const MINER_WORKER = path.join(__dirname, "rpow-miner-worker.js");
const IS_WINDOWS = os.platform() === "win32";

// Robust binary path detection
function getBinaryPath(name) {
  const paths = [
    path.join(__dirname, name),
    path.join(__dirname, name + ".exe"),
    path.join("/app", name),
    path.join("/app", name + ".exe")
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return path.join(__dirname, IS_WINDOWS ? name + ".exe" : name);
}

const NATIVE_MINER = getBinaryPath("rpow-native-miner");
const GPU_MINER = getBinaryPath("rpow-gpu-miner");

const SAFE_HOSTS = new Set([
  "api.rpow2.com",
  "rpow2.com",
  "www.rpow2.com",
  "127.0.0.1.sslip.io",
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      out._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      out[key] = next;
      i += 1;
    } else {
      out[key] = true;
    }
  }
  return out;
}

function log(level, message, data) {
  const suffix = data === undefined ? "" : ` ${formatLogData(data)}`;
  const upper = level.toUpperCase();
  const plainLevel = upper.padEnd(7);
  const color = process.env.NO_COLOR
    ? ""
    : upper === "SUCCESS" ? COLORS.green
      : upper === "WARN" ? COLORS.yellow
        : upper === "ERROR" ? COLORS.red
          : upper === "INFO" ? COLORS.cyan
            : "";
  const reset = color ? COLORS.reset : "";
  console.log(`${new Date().toISOString()} ${color}${plainLevel}${reset} ${message}${suffix}`);
}

function verboseEnabled() {
  return process.env.RPOW_VERBOSE === "1" || globalThis.__RPOW_VERBOSE__ === true;
}

function debugLog(message, data) {
  if (verboseEnabled()) log("info", message, data);
}

function formatLogData(data) {
  if (data === null || typeof data !== "object") return String(data);
  return Object.entries(data).map(([key, value]) => {
    if (value === undefined) return null;
    if (value === null) return `${key}=null`;
    if (typeof value === "object") return `${key}=${JSON.stringify(value)}`;
    const text = String(value);
    return /^[A-Za-z0-9._:/?=-]+$/.test(text) ? `${key}=${text}` : `${key}=${JSON.stringify(text)}`;
  }).filter(Boolean).join(" ");
}

function safeUrlForLog(url) {
  return `${url.origin}${url.pathname}${url.search ? "?..." : ""}`;
}

function retryAfterMs(headers) {
  const value = headers.get("retry-after");
  if (!value) return null;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(value);
  if (Number.isFinite(date)) return Math.max(0, date - Date.now());
  return null;
}

function isAuthRequest(method, url) {
  return method === "POST" && url.pathname === "/auth/request";
}

function looksLikeProviderRateLimit(err) {
  return err.status === 429
    || err.code === "RATE_LIMITED"
    || /too many requests|rate limit|try again/i.test(err.message || "");
}

function errorCode(err) {
  return err?.code || err?.cause?.code || err?.cause?.cause?.code;
}

function isAbortLikeError(err) {
  const code = errorCode(err);
  return err?.name === "AbortError"
    || code === 20
    || code === "20"
    || err?.message === "This operation was aborted"
    || /aborted/i.test(err?.message || "");
}

function isTransientNetworkError(err) {
  const code = errorCode(err);
  return isAbortLikeError(err)
    || err?.message === "fetch failed"
    || [
      "ECONNRESET",
      "ECONNREFUSED",
      "EPIPE",
      "ETIMEDOUT",
      "ENOTFOUND",
      "EAI_AGAIN",
      "UND_ERR_CONNECT_TIMEOUT",
      "UND_ERR_HEADERS_TIMEOUT",
      "UND_ERR_BODY_TIMEOUT",
      "UND_ERR_SOCKET",
    ].includes(code);
}

function loadState(file) {
  let state = {};
  
  // Try loading from file first as it's more reliable
  try {
    if (fs.existsSync(file)) {
      state = JSON.parse(fs.readFileSync(file, "utf8"));
    }
  } catch (err) {
    log("warn", "Failed to parse state file, starting fresh", { file, error: err.message });
  }

  // Override with environment variable if present and valid
  if (process.env.RPOW_STATE_JSON) {
    try {
      const envState = JSON.parse(process.env.RPOW_STATE_JSON);
      state = { ...state, ...envState };
    } catch (err) {
      log("error", "Failed to parse RPOW_STATE_JSON environment variable", { error: err.message });
      // If environment variable is invalid, we already have the file state or empty object
    }
  }
  
  return state;
}

function isRetryableStateWriteError(err) {
  return ["EPERM", "EACCES", "EBUSY"].includes(err?.code);
}

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function saveState(file, state) {
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  const payload = `${JSON.stringify(state, null, 2)}\n`;
  fs.writeFileSync(tmp, payload);
  try {
    for (let attempt = 1; ; attempt += 1) {
      try {
        fs.renameSync(tmp, file);
        return;
      } catch (err) {
        if (!isRetryableStateWriteError(err) || attempt >= 5) throw err;
        sleepSync(attempt * 25);
      }
    }
  } catch (err) {
    if (!isRetryableStateWriteError(err)) throw err;
    fs.writeFileSync(file, payload);
    try {
      fs.unlinkSync(tmp);
    } catch (unlinkErr) {
      if (unlinkErr.code !== "ENOENT") debugLog("state tmp cleanup skipped", { file: tmp, code: unlinkErr.code });
    }
    log("warn", "state rename was blocked; fell back to direct overwrite", { file, code: err.code });
  }
}

function discoverFromIndex(indexFile) {
  const js = fs.readFileSync(indexFile, "utf8");
  const apiOrigin = /const\s+\w+\s*=\s*"([^"]+)";\s*async function\s+\w+\(\w+,\s*\w+,\s*\w+\)/.exec(js)?.[1]
    || DEFAULT_API_ORIGIN;
  const endpoints = [...js.matchAll(/(\w+):\s*(?:(?:\(\)|\w+)\s*=>\s*)?\w+\("([A-Z]+)",\s*"([^"]+)"/g)]
    .map((m) => ({ name: m[1], method: m[2], path: m[3] }));
  const workerPath = /new URL\("([^"]*miner\.worker-[^"]+\.js)"/.exec(js)?.[1] || null;
  return { apiOrigin, endpoints, workerPath };
}

function printApiMap(discovered) {
  console.log(`API origin: ${discovered.apiOrigin}`);
  console.log("Browser request defaults: credentials=include, JSON content-type only when body exists.");
  console.log("Sequence:");
  console.log("1. POST /auth/request { email } -> sends magic link, no browser UI needed.");
  console.log("2. Open/fetch magic link -> server sets session cookie; CLI stores Set-Cookie values.");
  console.log("3. GET /me -> verifies session and balance.");
  console.log("4. POST /challenge -> { challenge_id, nonce_prefix, difficulty_bits }.");
  console.log("5. Mine locally: SHA-256(nonce_prefix || uint64-le nonce), accept trailing zero bits >= difficulty_bits.");
  console.log("6. POST /mint { challenge_id, solution_nonce } -> mints/claims token.");
  console.log("7. Repeat from /challenge for more tokens; no separate commit/reveal endpoint is used by this site.");
  console.log("Endpoints found in index.js:");
  for (const e of discovered.endpoints) console.log(`- ${e.name}: ${e.method} ${e.path}`);
  if (discovered.workerPath) console.log(`Worker: ${discovered.workerPath}`);
}

function assertSafeUrl(rawUrl, apiOrigin) {
  const url = new URL(rawUrl, apiOrigin);
  if (!["https:", "http:"].includes(url.protocol)) throw new Error(`blocked non-http URL: ${rawUrl}`);
  if (!SAFE_HOSTS.has(url.hostname)) throw new Error(`blocked non-RPOW host: ${url.hostname}`);
  return url;
}

function cookieHeader(cookies) {
  if (!cookies) return null;
  const parts = Object.entries(cookies).map(([k, v]) => `${k}=${v}`);
  return parts.length > 0 ? parts.join("; ") : null;
}

function storeSetCookies(state, setCookies) {
  if (!state.cookies) state.cookies = {};
  for (const header of setCookies) {
    const first = header.split(";")[0];
    const eq = first.indexOf("=");
    if (eq < 0) continue;
    const name = first.slice(0, eq).trim();
    const value = first.slice(eq + 1).trim();
    if (value) state.cookies[name] = value;
    else delete state.cookies[name];
  }
}

function responseSetCookies(headers) {
  if (typeof headers.getSetCookie === "function") return headers.getSetCookie();
  const single = headers.get("set-cookie");
  return single ? [single] : [];
}

function parseProxySpec(spec) {
  if (!spec) return null;
  if (/^https?:\/\//i.test(spec)) {
    const url = new URL(spec);
    return {
      protocol: url.protocol,
      host: url.hostname,
      port: Number(url.port || (url.protocol === "https:" ? 443 : 80)),
      username: decodeURIComponent(url.username || ""),
      password: decodeURIComponent(url.password || ""),
    };
  }
  const at = spec.indexOf("@");
  const colon = spec.indexOf(":");
  if (at <= 0 || colon <= 0 || colon > at) {
    throw new Error(`bad proxy format: ${spec}`);
  }
  const host = spec.slice(0, colon);
  const port = Number(spec.slice(colon + 1, at));
  const creds = spec.slice(at + 1);
  const credSep = creds.indexOf(":");
  if (!host || !Number.isInteger(port) || port < 1 || credSep < 0) {
    throw new Error(`bad proxy format: ${spec}`);
  }
  return {
    protocol: "http:",
    host,
    port,
    username: creds.slice(0, credSep),
    password: creds.slice(credSep + 1),
  };
}

function proxyLabel(proxy) {
  return proxy ? `${proxy.host}:${proxy.port}` : null;
}

function proxyAuthHeader(proxy) {
  if (!proxy?.username && !proxy?.password) return null;
  return `Basic ${Buffer.from(`${proxy.username || ""}:${proxy.password || ""}`, "utf8").toString("base64")}`;
}

function makeHeadersBag(headers) {
  const map = new Map();
  for (const [key, value] of Object.entries(headers || {})) {
    map.set(key.toLowerCase(), value);
  }
  return {
    get(name) {
      const value = map.get(String(name).toLowerCase());
      if (Array.isArray(value)) return value.join(", ");
      return value ?? null;
    },
    getSetCookie() {
      const value = map.get("set-cookie");
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    },
  };
}

function responseFromIncomingMessage(res, bodyText) {
  return {
    status: res.statusCode || 0,
    statusText: res.statusMessage || "",
    ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300,
    headers: makeHeadersBag(res.headers),
    text: async () => bodyText,
  };
}

function connectHttpsTunnel(url, proxy, signal) {
  return new Promise((resolve, reject) => {
    const socket = net.connect(proxy.port, proxy.host);
    let settled = false;
    let buffer = Buffer.alloc(0);
    const auth = proxyAuthHeader(proxy);

    function fail(err) {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(err);
    }

    function cleanup() {
      socket.removeAllListeners("connect");
      socket.removeAllListeners("data");
      socket.removeAllListeners("error");
      socket.removeAllListeners("close");
      signal?.removeEventListener?.("abort", onAbort);
    }

    function onAbort() {
      const err = new Error("This operation was aborted");
      err.name = "AbortError";
      err.code = 20;
      fail(err);
    }

    socket.once("error", fail);
    socket.once("close", () => {
      if (!settled) fail(new Error("proxy tunnel closed before CONNECT completed"));
    });
    socket.once("connect", () => {
      const lines = [
        `CONNECT ${url.hostname}:${url.port || 443} HTTP/1.1`,
        `Host: ${url.hostname}:${url.port || 443}`,
        "Proxy-Connection: keep-alive",
        "Connection: keep-alive",
      ];
      if (auth) lines.push(`Proxy-Authorization: ${auth}`);
      socket.write(`${lines.join("\r\n")}\r\n\r\n`);
    });
    socket.on("data", (chunk) => {
      if (settled) return;
      buffer = Buffer.concat([buffer, chunk]);
      const end = buffer.indexOf("\r\n\r\n");
      if (end < 0) return;
      const head = buffer.slice(0, end).toString("utf8");
      const [statusLine] = head.split("\r\n");
      const match = /^HTTP\/1\.\d\s+(\d+)/i.exec(statusLine);
      if (!match) return fail(new Error(`bad proxy CONNECT response: ${statusLine}`));
      const status = Number(match[1]);
      if (status !== 200) return fail(new Error(`proxy CONNECT failed with HTTP ${status}`));
      settled = true;
      cleanup();
      socket.removeAllListeners("data");
      const leftover = buffer.slice(end + 4);
      const secureSocket = tls.connect({
        socket,
        servername: url.hostname,
      });
      if (leftover.length > 0) secureSocket.unshift(leftover);
      secureSocket.once("error", reject);
      secureSocket.once("secureConnect", () => resolve(secureSocket));
    });
    signal?.addEventListener?.("abort", onAbort, { once: true });
  });
}

function nodeRequest(url, { method, headers, body, proxy, signal, timeout }) {
  return new Promise((resolve, reject) => {
    const isHttps = url.protocol === "https:";
    const agent = isHttps ? https : http;
    const options = {
      method,
      headers,
      signal,
      timeout,
    };

    let settled = false;
    function finish(res, bodyText) {
      if (settled) return;
      settled = true;
      resolve(responseFromIncomingMessage(res, bodyText));
    }

    async function start() {
      try {
        if (proxy && isHttps) {
          options.createConnection = (opts, cb) => {
            connectHttpsTunnel(url, proxy, signal).then((s) => cb(null, s), cb);
          };
        } else if (proxy) {
          options.host = proxy.host;
          options.port = proxy.port;
          options.path = url.href;
          const auth = proxyAuthHeader(proxy);
          if (auth) {
            options.headers = { ...options.headers, "Proxy-Authorization": auth };
          }
        }

        const req = agent.request(proxy ? options : url, options, (res) => {
          let text = "";
          res.on("data", (chunk) => { text += chunk.toString(); });
          res.on("end", () => finish(res, text));
        });
        req.on("error", (err) => {
          if (!settled) reject(err);
        });
        req.on("timeout", () => {
          req.destroy();
          const err = new Error("request timeout");
          err.code = "ETIMEDOUT";
          if (!settled) reject(err);
        });
        if (body) req.write(body);
        req.end();
      } catch (err) {
        if (!settled) reject(err);
      }
    }

    start();
  });
}

class RpowClient {
  constructor(options = {}) {
    this.apiOrigin = options.apiOrigin || DEFAULT_API_ORIGIN;
    this.siteOrigin = options.siteOrigin || DEFAULT_SITE_ORIGIN;
    this.stateFile = options.stateFile || DEFAULT_STATE;
    this.state = loadState(this.stateFile);
    this.proxy = parseProxySpec(options.proxy || process.env.RPOW_PROXY);
    this.timeout = Number(options.timeout || 30000);
    this.retries = Number(options.retries ?? 3);
  }

  save() {
    saveState(this.stateFile, this.state);
  }

  async api(method, path, body = null, options = {}) {
    const url = assertSafeUrl(path, this.apiOrigin);
    const headers = {
      ...options.headers,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "application/json, text/plain, */*",
      "Origin": this.siteOrigin,
      "Referer": `${this.siteOrigin}/`,
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    };
    const cookie = cookieHeader(this.state.cookies);
    if (cookie) headers.Cookie = cookie;
    
    let bodyText = null;
    if (body) {
      headers["Content-Type"] = "application/json";
      bodyText = JSON.stringify(body);
    }

    let lastErr = null;
    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeout);
      try {
        if (attempt > 0) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
          debugLog("retrying request", { method, path, attempt, delay_ms: delay });
          await sleep(delay);
        }

        const res = await nodeRequest(url, {
          method,
          headers,
          body: bodyText,
          proxy: this.proxy,
          signal: controller.signal,
          timeout: this.timeout,
        });

        const setCookies = res.headers.getSetCookie();
        if (setCookies.length > 0) {
          storeSetCookies(this.state, setCookies);
          this.save();
        }

        const text = await res.text();
        if (!res.ok) {
          const err = new Error(text || res.statusText);
          err.status = res.status;
          err.retryable = res.status === 429 || (res.status >= 500 && res.status <= 599);
          err.retryAfterMs = retryAfterMs(res.headers);
          try {
            const data = JSON.parse(text);
            if (data.code) err.code = data.code;
            if (data.message) err.message = data.message;
          } catch (e) {
            // ignore
          }
          throw err;
        }

        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      } catch (err) {
        lastErr = err;
        if (isAbortLikeError(err)) {
          debugLog("request aborted", { method, path });
          throw err;
        }
        if (err.status === 401 || err.status === 403 || !isTransientNetworkError(err)) {
          throw err;
        }
      } finally {
        clearTimeout(timer);
      }
    }
    throw lastErr;
  }

  async followMagicLink(rawUrl) {
    const url = new URL(rawUrl);
    const res = await nodeRequest(url, {
      method: "GET",
      proxy: this.proxy,
      timeout: this.timeout,
    });
    const setCookies = res.headers.getSetCookie();
    if (setCookies.length > 0) {
      storeSetCookies(this.state, setCookies);
      this.save();
    }
    if (!res.ok) throw new Error(`magic link failed: ${res.status} ${res.statusText}`);
  }
}

function tryJson(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

async function mineSolutionParallel(challenge, state, stateFile, logEveryMs, workers) {
  return new Promise((resolve, reject) => {
    const active = new Set();
    let solution = null;
    const started = Date.now();

    function cleanup() {
      for (const w of active) w.terminate();
      active.clear();
    }

    function onMessage(w, msg) {
      if (msg.type === "solution") {
        solution = msg;
        cleanup();
        resolve({
          solution_nonce: msg.nonce,
          hashes: msg.hashes,
          speed: msg.speed,
          elapsed_ms: Date.now() - started,
        });
      } else if (msg.type === "progress") {
        const totalHashes = Array.from(active).reduce((acc, worker) => acc + BigInt(worker.hashes || "0"), 0n);
        const elapsed = (Date.now() - started) / 1000;
        const speed = Number(totalHashes) / elapsed;
        log("info", "mining progress", {
          hashes: totalHashes.toString(),
          speed: `${(speed / 1000000).toFixed(2)} MH/s`,
        });
      }
    }

    for (let i = 0; i < workers; i += 1) {
      const w = new Worker(MINER_WORKER, {
        workerData: {
          challenge_id: challenge.challenge_id,
          nonce_prefix: challenge.nonce_prefix,
          difficulty_bits: challenge.difficulty_bits,
          start_nonce: (BigInt(state.mining?.nonce || "0") + BigInt(i)).toString(),
          step: BigInt(workers).toString(),
        },
      });
      w.on("message", (msg) => onMessage(w, msg));
      w.on("error", (err) => { cleanup(); reject(err); });
      w.on("exit", (code) => {
        active.delete(w);
        if (code !== 0 && !solution) {
          cleanup();
          reject(new Error(`miner worker exited with code ${code}`));
        }
      });
      active.add(w);
    }
  });
}

async function mineSolutionNative(challenge, state, stateFile, logEveryMs, workers) {
  if (!fs.existsSync(NATIVE_MINER)) {
    throw new Error(`native miner not built: ${NATIVE_MINER}`);
  }
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const args = [
      "--prefix", challenge.nonce_prefix,
      "--difficulty", String(challenge.difficulty_bits),
      "--start", state.mining?.nonce || "0",
      "--workers", String(workers),
      "--progress-ms", String(logEveryMs),
    ];
    const child = spawn(NATIVE_MINER, args, { windowsHide: true });
    let solution = null;
    let buffer = "";

    child.stdout.on("data", (chunk) => {
      buffer += chunk.toString();
      while (buffer.includes("\n")) {
        const line = buffer.slice(0, buffer.indexOf("\n")).trim();
        buffer = buffer.slice(buffer.indexOf("\n") + 1);
        if (!line) continue;
        const msg = tryJson(line);
        if (msg) {
          if (msg.type === "found" || msg.type === "solution") {
            solution = msg;
            child.kill();
          } else if (msg.type === "progress") {
            log("info", "mining progress", {
              hashes: msg.hashes,
              speed: `${(msg.speed / 1000000).toFixed(2)} MH/s`,
            });
            state.mining.nonce = msg.nonce;
            state.mining.hashes = msg.hashes;
            saveState(stateFile, state);
          }
        } else {
          debugLog("miner output", line);
        }
      }
    });

    child.stderr.on("data", (chunk) => {
      const line = chunk.toString().trim();
      if (line) log("warn", "miner stderr", line);
    });

    child.on("error", (err) => {
      reject(err);
    });

    child.on("exit", (code) => {
      if (solution) {
        resolve({
          solution_nonce: solution.nonce,
          hashes: solution.hashes,
          speed: solution.speed,
          elapsed_ms: Date.now() - started,
        });
      } else {
        reject(new Error(`native miner exited with code ${code}`));
      }
    });
  });
}

async function mineSolutionGpu(challenge, state, stateFile, logEveryMs, workers, args) {
  if (!fs.existsSync(GPU_MINER)) {
    throw new Error(`gpu miner not built: ${GPU_MINER}`);
  }
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const minerArgs = [
      "--challenge", challenge.challenge_id,
      "--prefix", challenge.nonce_prefix,
      "--bits", String(challenge.difficulty_bits),
      "--nonce", state.mining?.nonce || "0",
      "--batch-size", String(args["gpu-batch"] || 1048576),
      "--local-size", String(args["gpu-local-size"] || 256),
      "--platform", String(args["gpu-platform"] || 0),
      "--device", String(args["gpu-device"] || 0),
      "--log-every-ms", String(logEveryMs),
    ];
    const child = spawn(GPU_MINER, minerArgs, { windowsHide: true });
    let solution = null;
    let buffer = "";

    child.stdout.on("data", (chunk) => {
      buffer += chunk.toString();
      while (buffer.includes("\n")) {
        const line = buffer.slice(0, buffer.indexOf("\n")).trim();
        buffer = buffer.slice(buffer.indexOf("\n") + 1);
        if (!line) continue;
        const msg = tryJson(line);
        if (msg) {
          if (msg.type === "found" || msg.type === "solution") {
            solution = msg;
            child.kill();
          } else if (msg.type === "progress") {
            log("info", "mining progress", {
              hashes: msg.hashes,
              speed: `${(msg.speed / 1000000).toFixed(2)} MH/s`,
            });
            state.mining.nonce = msg.nonce;
            state.mining.hashes = msg.hashes;
            saveState(stateFile, state);
          }
        } else {
          debugLog("miner output", line);
        }
      }
    });

    child.stderr.on("data", (chunk) => {
      const line = chunk.toString().trim();
      if (line) log("warn", "miner stderr", line);
    });

    child.on("error", (err) => {
      reject(err);
    });

    child.on("exit", (code) => {
      if (solution) {
        resolve({
          solution_nonce: solution.nonce,
          hashes: solution.hashes,
          speed: solution.speed,
          elapsed_ms: Date.now() - started,
        });
      } else {
        reject(new Error(`gpu miner exited with code ${code}`));
      }
    });
  });
}

function defaultWorkerCount() {
  return Math.max(1, os.cpus().length - 1);
}

async function promptLine(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  const argv = process.argv.slice(2);
  const args = parseArgs(argv);
  const command = args._[0];

  if (args.verbose) {
    globalThis.__RPOW_VERBOSE__ = true;
  }

  const client = new RpowClient({
    stateFile: args.state,
    proxy: args.proxy,
    timeout: args.timeout,
    retries: args.retries,
  });

  if (command === "map") {
    const discovered = discoverFromIndex(DEFAULT_INDEX);
    printApiMap(discovered);
    return;
  }

  if (command === "login") {
    const email = args.email || await promptLine("email: ");
    client.state.email = email;
    client.save();
    await client.api("POST", "/auth/request", { email });
    log("success", "magic link sent to email; use 'complete-login --link ...' to finish");
    return;
  }

  if (command === "complete-login") {
    const link = args.link || await promptLine("magic link: ");
    await client.followMagicLink(link);
    const me = await client.api("GET", "/me");
    log("success", "logged in", me);
    return;
  }

  if (command === "me") {
    log("success", "profile", await client.api("GET", "/me"));
    return;
  }

  if (command === "ledger") {
    log("success", "ledger", await client.api("GET", "/ledger"));
    return;
  }

  if (command === "activity") {
    log("success", "activity", await client.api("GET", "/activity"));
    return;
  }

  if (command === "send") {
    const recipient = args.to || await promptLine("recipient email: ");
    const amount = Number(args.amount || await promptLine("amount: "));
    const idempotency_key = args.idempotency || crypto.randomUUID();
    log("success", "send result", await client.api("POST", "/send", { recipient_email: recipient, amount, idempotency_key }));
    return;
  }

  if (command === "logout") {
    await client.api("POST", "/auth/logout");
    client.state.cookies = {};
    client.save();
    log("success", "logged out");
    return;
  }

  if (command === "mine" || command === "run") {
    const target = Number(args.count || args.tokens || 1);
    const workers = Number(args.workers || defaultWorkerCount());
    const engine = args.engine || (fs.existsSync(NATIVE_MINER) ? "native" : "node");
    const logEveryMs = Number(args["log-every-ms"] || (["native", "gpu"].includes(engine) ? 1000 : 5000));
    if (!Number.isInteger(workers) || workers < 1) throw new Error("--workers must be a positive integer");
    if (!["native", "node", "gpu"].includes(engine)) throw new Error("--engine must be native, gpu or node");
    let minted = 0;
    while (true) {
      try {
        await client.api("GET", "/me");
        break;
      } catch (err) {
        if (err.code === "UNAUTHORIZED") {
          log("info", "No valid session on startup, attempting auto-login...");
          // This will trigger the auto-login logic in the request method's catch block
          await client.request("GET", "/me");
          break;
        }
        if (!(err.retryable || isTransientNetworkError(err))) throw err;
        const delay = Math.max(5000, Math.min(Number(err.retryAfterMs || 0) || 0, 60000));
        log("warn", "startup request failed; waiting before retrying mine loop", {
          code: errorCode(err),
          error: err.message,
          delay_ms: delay,
        });
        await sleep(delay);
      }
    }

    // Start Telegram update checker in background
    if (TELEGRAM_BOT_TOKEN) {
      setInterval(() => checkTelegramUpdates(client, target, minted), 10000);
    }

    while (minted < target) {
      let challenge = client.state.challenge;
      const challengeExpiresAt = challenge?.expires_at ? Date.parse(challenge.expires_at) : null;
      const challengeExpired = Number.isFinite(challengeExpiresAt) && Date.now() >= challengeExpiresAt - 5000;
      if (!challenge || challengeExpired || client.state.mining?.challenge_id !== challenge.challenge_id || args.fresh) {
        if (challengeExpired) log("warn", "saved challenge expired; requesting a fresh one", { challenge_id: challenge.challenge_id });
        try {
          challenge = await client.api("POST", "/challenge");
        } catch (err) {
          if (err.code === "UNAUTHORIZED") throw err;
          if (!(err.retryable || isTransientNetworkError(err))) throw err;
          const delay = Math.max(5000, Math.min(Number(err.retryAfterMs || 0) || 0, 60000));
          log("warn", "challenge request exhausted retries; mine loop will pause and retry", {
            code: errorCode(err),
            error: err.message,
            delay_ms: delay,
          });
          client.state.challenge = null;
          client.save();
          await sleep(delay);
          continue;
        }
        client.state.challenge = challenge;
        client.state.mining = { challenge_id: challenge.challenge_id, nonce: "0", hashes: "0", difficulty_bits: challenge.difficulty_bits };
        client.save();
      }
      log("info", "challenge", {
        id: challenge.challenge_id,
        difficulty: `${challenge.difficulty_bits} bits`,
        expires: challenge.expires_at,
      });
      let solution;
      try {
        log("info", "miner config", { workers, engine });
        solution = engine === "native"
          ? await mineSolutionNative(challenge, client.state, client.stateFile, logEveryMs, workers)
          : engine === "gpu"
            ? await mineSolutionGpu(challenge, client.state, client.stateFile, logEveryMs, workers, args)
            : await mineSolutionParallel(challenge, client.state, client.stateFile, logEveryMs, workers);
      } catch (err) {
        if (err.code === "CHALLENGE_EXPIRED") {
          log("warn", "challenge expired during mining; requesting a fresh one");
          client.state.challenge = null;
          client.state.mining = null;
          client.save();
          continue;
        }
        throw err;
      }
      log("info", "solution found", {
        nonce: solution.solution_nonce,
        hashes: solution.hashes,
        speed: solution.speed,
        elapsed_ms: solution.elapsed_ms,
      });
      try {
        const result = await client.api("POST", "/mint", {
          challenge_id: challenge.challenge_id,
          solution_nonce: solution.solution_nonce,
        });
        minted += 1;
        client.state.minted_count = minted;
        client.state.last_mint = result;
        client.state.challenge = null;
        client.state.mining = null;
        client.save();
        log("success", "mint/claim accepted", result);
        log("success", "mint progress", { minted, target, remaining: Math.max(0, target - minted) });
        await sendTelegramAlert(`✅ <b>Berhasil Minting, Master!</b>\n\n<b>Detail:</b> <pre>${JSON.stringify(result, null, 2)}</pre>\n<b>Progress:</b> ${minted}/${target}`);
      } catch (err) {
        if (err.code === "UNAUTHORIZED") {
          log("warn", "session invalid; attempting auto-login via Gmail API...");
          await sendTelegramAlert(`🔄 <b>Sesi Berakhir, Master!</b>\n\nSesi Master sudah tidak valid. Saya sedang mencoba login otomatis via Gmail API...`);
          
          try {
            const email = client.state.email || process.env.RPOW_EMAIL;
            if (!email) throw new Error("Email not found in state or environment");
            
            await client.api("POST", "/auth/request", { email });
            log("info", "magic link requested, waiting for email...");
            
            let magicLink = null;
            for (let i = 0; i < 12; i++) {
              await sleep(10000);
              magicLink = await findMagicLinkInGmail();
              if (magicLink) break;
              log("info", `waiting for email... (${(i + 1) * 10}s)`);
            }
            
            if (!magicLink) throw new Error("Magic link not found in Gmail after 2 minutes");
            
            await client.followMagicLink(magicLink);
            const me = await client.api("GET", "/me");
            log("success", "auto-login successful", me);
            await sendTelegramAlert(`✅ <b>Auto-Login Berhasil, Master!</b>\n\nSesi telah diperbarui otomatis. Mining dilanjutkan!`);
            continue;
          } catch (loginErr) {
            log("error", "auto-login failed", { error: loginErr.message });
            await sendTelegramAlert(`❌ <b>Auto-Login Gagal, Master!</b>\n\n<b>Pesan:</b> ${loginErr.message}\nMiner akan mencoba lagi dalam 1 hour.`);
            await sleep(3600000);
            throw err;
          }
        }
        log("warn", "mint failed; dropping challenge and continuing with a fresh one", { error: err.message, code: err.code, status: err.status });
        client.state.challenge = null;
        client.state.mining = null;
        client.save();
      }
    }
    log("success", "pipeline complete", { minted, target, remaining: Math.max(0, target - minted) });
    return;
  }

  console.log(`Usage:
  node rpow-cli.js map
  node rpow-cli.js login --email you@example.com
  node rpow-cli.js complete-login --link "https://..."
  node rpow-cli.js me
  node rpow-cli.js mine --count 1
  node rpow-cli.js run --count 3
  node rpow-cli.js send --to user@example.com --amount 1
  node rpow-cli.js ledger
  node rpow-cli.js activity
  node rpow-cli.js logout

Options:
  --state .rpow-cli-state.json
  --proxy host:port@user:pass
  --timeout 20000
  --retries 5
  --log-every-ms 5000
  --workers ${defaultWorkerCount()}
  --engine native|gpu|node
  --gpu-batch 1048576
  --gpu-local-size 256
  --gpu-platform 0
  --gpu-device 0
  --verbose`);
}

main().catch(async (err) => {
  log("error", err.message, { code: err.code, status: err.status });
  await sendTelegramAlert(`❌ <b>Waduh Master, Ada Error!</b>\n\n<b>Pesan:</b> ${err.message}\n<b>Code:</b> ${err.code || "N/A"}`);
  process.exitCode = 1;
});
