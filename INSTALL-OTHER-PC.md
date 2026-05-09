# Установка RPOW CLI на другой ПК

## Что внутри

```text
rpow-cli.js              Node.js CLI: login, cookies, API, retries, логи, orchestration
rpow-native-miner.exe    Быстрый native C miner для Windows
rpow-native-miner.c      Исходник native miner, можно пересобрать под другой CPU/ОС
rpow-miner-worker.js     Медленный Node fallback miner
rpow-cli.README.md       Полное описание команд
index.js                 Исходный frontend bundle для API discovery
```

`.rpow-cli-state.json` специально не включен в архив, потому что там cookies/session.

## Требования

Установить Node.js 18+:

```powershell
node -v
```

Для Windows быстрый miner уже собран: `rpow-native-miner.exe`.

Если хочешь пересобрать под конкретный CPU:

```powershell
gcc -O3 -march=native -pthread rpow-native-miner.c -o rpow-native-miner.exe
```

## Первый запуск

Распакуй архив, открой PowerShell в папке с файлами:

```powershell
node rpow-cli.js map
node rpow-cli.js login --email you@example.com
node rpow-cli.js complete-login --link "MAGIC_LINK_FROM_EMAIL"
node rpow-cli.js mine --count 10 --workers 8 --engine native
```

## Если нет native miner

Можно использовать Node fallback, но он намного медленнее:

```powershell
node rpow-cli.js mine --count 1 --workers 8 --engine node
```

## Полезные команды

```powershell
node rpow-cli.js me
node rpow-cli.js ledger
node rpow-cli.js activity
node rpow-cli.js logout
```

Подробные HTTP-логи:

```powershell
node rpow-cli.js mine --verbose
```

Отключить цвета:

```powershell
$env:NO_COLOR=1
node rpow-cli.js mine
```
