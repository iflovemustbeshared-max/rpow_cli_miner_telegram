# RPOW CLI

CLI повторяет backend/API pipeline сайта без браузерного UI.

## Быстрый старт

```powershell
node rpow-cli.js map
node rpow-cli.js login --email you@example.com
node rpow-cli.js complete-login --link "PASTE_MAGIC_LINK_HERE"
node rpow-cli.js mine --count 1
```

## Команды

`map`

Показывает API origin, endpoint'ы, найденные в `index.js`, и фактическую последовательность действий.

```powershell
node rpow-cli.js map
```

`login`

Отправляет запрос magic link на email через `POST /auth/request`.

```powershell
node rpow-cli.js login --email you@example.com
```

Если API вернет rate-limit, команда остановится. Не запускай ее много раз подряд: это повторно дергает отправку email.

`complete-login`

Принимает magic link из почты, проходит по нему, сохраняет session cookies в state-файл и проверяет сессию через `GET /me`.

```powershell
node rpow-cli.js complete-login --link "https://..."
```

`me`

Показывает текущего пользователя, баланс и счетчики. Требует активную сессию.

```powershell
node rpow-cli.js me
```

`mine`

Выполняет полный mining pipeline: `GET /me`, `POST /challenge`, локальный proof-of-work, `POST /mint`.

```powershell
node rpow-cli.js mine --count 1
```

`run`

То же, что `mine`, удобный alias для непрерывного запуска на несколько токенов.

```powershell
node rpow-cli.js run --count 3
```

`send`

Отправляет RPOW другому email через `POST /send`. Требует активную сессию и баланс.

```powershell
node rpow-cli.js send --to friend@example.com --amount 1
```

`activity`

Показывает активность аккаунта через `GET /activity`.

```powershell
node rpow-cli.js activity
```

`ledger`

Показывает публичную статистику ledger. Сессия не нужна.

```powershell
node rpow-cli.js ledger
```

`logout`

Вызывает `POST /auth/logout` и очищает локальные cookies.

```powershell
node rpow-cli.js logout
```

## Опции

`--state`

Путь к state-файлу. По умолчанию используется `.rpow-cli-state.json`.

```powershell
node rpow-cli.js mine --state .my-rpow-state.json
```

`--timeout`

Timeout HTTP-запроса в миллисекундах. По умолчанию `20000`.

```powershell
node rpow-cli.js ledger --timeout 10000
```

`--retries`

Количество ретраев для transient-сбоев: timeout, `429`, `5xx`. По умолчанию `5`.

```powershell
node rpow-cli.js mine --retries 8
```

`--log-every-ms`

Как часто писать mining progress и сохранять nonce в state. По умолчанию `5000`.

```powershell
node rpow-cli.js mine --log-every-ms 2000
```

`--workers`

Количество CPU worker-потоков для майнинга. По умолчанию CLI использует до 8 потоков, оставляя одно ядро системе. Для максимальной скорости можно поставить число логических ядер CPU.

```powershell
node rpow-cli.js mine --workers 8
```

Если система начинает тормозить, уменьши значение:

```powershell
node rpow-cli.js mine --workers 4
```

`--engine`

Выбор майнера: `native` или `node`. Если рядом есть `rpow-native-miner.exe`, CLI по умолчанию использует `native`.

```powershell
node rpow-cli.js mine --engine native --workers 8
node rpow-cli.js mine --engine node --workers 8
```

Native miner собирается так:

```powershell
gcc -O3 -march=native -pthread rpow-native-miner.c -o rpow-native-miner.exe
```

`--fresh`

Игнорирует сохраненный challenge и берет новый через `POST /challenge`.

```powershell
node rpow-cli.js mine --fresh
```

## Логи

Каждый HTTP-запрос логируется:

В обычном режиме HTTP-запросы скрыты, чтобы не шуметь. Включить подробный режим:

```powershell
node rpow-cli.js mine --verbose
```

или:

```powershell
$env:RPOW_VERBOSE=1
node rpow-cli.js mine
```

В verbose-режиме каждый HTTP-запрос логируется:

```text
HTTP -> method/url/attempt/has_body/has_cookie
HTTP <- method/url/attempt/status/ms/set_cookie/retry_after_ms
```

Cookies и query magic link не печатаются.

Mining progress логируется отдельно:

```text
mining hashes=... nonce=... workers=8 engine=native speed="21.00 MH/s"
```

## Ретраи и восстановление

Скрипт ретраит timeout, `429`, `408`, `425`, `500`, `502`, `503`, `504` с exponential backoff и jitter.

`POST /auth/request` обрабатывается отдельно: при rate-limit скрипт не спамит повторные email-запросы, а останавливается и просит подождать.

State сохраняется в `.rpow-cli-state.json`: cookies, текущий challenge, nonce и последний mint. Если процесс упал во время майнинга, можно снова запустить:

```powershell
node rpow-cli.js mine --count 1
```

Он продолжит с сохраненного nonce, если challenge еще валиден.

## Безопасность

Скрипт ходит только на allowlist host'ов, которые реально использует сайт:

```text
api.rpow2.com
rpow2.com
www.rpow2.com
127.0.0.1.sslip.io
```

Он не сканирует сеть, не перебирает endpoint'ы и не делает действий вне логики сайта.

## Фактический API pipeline

Из `index.js`:

```text
POST /auth/request   { email }
GET  /me
POST /challenge
POST /mint           { challenge_id, solution_nonce }
POST /send           { recipient_email, amount, idempotency_key }
GET  /activity
GET  /ledger
POST /auth/logout
```

Отдельного `commit/reveal/claim` фронтенд не использует. Для добычи токена claim выполняется через `POST /mint` после найденного PoW nonce.
