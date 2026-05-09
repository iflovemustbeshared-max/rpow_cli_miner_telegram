#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

cc_bin="${CC:-cc}"

if ! command -v "$cc_bin" >/dev/null 2>&1; then
  echo "C compiler not found: $cc_bin" >&2
  echo "macOS: run 'xcode-select --install'" >&2
  echo "Ubuntu/Debian: run 'sudo apt install build-essential'" >&2
  exit 1
fi

"$cc_bin" -O2 rpow-gpu-miner.c -o rpow-gpu-miner
chmod +x rpow-gpu-miner

echo "Built ./rpow-gpu-miner"
echo "Run: node rpow-cli.js mine --count 1 --engine gpu"
