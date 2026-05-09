# RPOW GPU Portable

This archive is for running the CLI on another Windows PC with GPU mining.

Included:

```text
rpow-cli.js
index.js
rpow-cli.README.md
INSTALL-GPU-OTHER-PC.md
rpow-gpu-miner.exe
rpow-gpu-miner.c
rpow-native-miner.exe
rpow-native-miner.c
rpow-miner-worker.js
```

Not included:

```text
.rpow-cli-state.json
rpow-a.json
.rpow-b.json
```

Requirements on the other PC:

```powershell
node -v
```

- Node.js 18+
- Windows GPU driver with OpenCL runtime
- For NVIDIA: normal GeForce/Studio driver is usually enough

Quick start:

```powershell
node rpow-cli.js login --email you@example.com --state .rpow-gpu.json
node rpow-cli.js complete-login --link "MAGIC_LINK_FROM_EMAIL" --state .rpow-gpu.json
node rpow-cli.js mine --count 1000 --engine gpu --state .rpow-gpu.json --workers 16 --gpu-batch 2097152 --gpu-local-size 256
```

If GPU engine is unavailable, test the binary directly:

```powershell
.\rpow-gpu-miner.exe --prefix 00 --difficulty 1 --batch-size 1024 --local-size 64
```

If GPU mining fails, CPU fallback still works:

```powershell
node rpow-cli.js mine --count 1000 --engine native --workers 8 --state .rpow-gpu.json
```
