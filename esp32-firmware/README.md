# ESP32 Firmware - Exemplo PlatformIO (RC522 Hello World)

Projeto de exemplo ESP-IDF + PlatformIO com RC522.

## Build
- `pio run`

## Upload
- `pio run -t upload`

## Monitor serial
- `pio device monitor --baud 115200`

## Pinos RC522 (padrão do exemplo)
- MISO: GPIO25
- MOSI: GPIO23
- SCLK: GPIO19
- SDA/SS: GPIO22
- RST: não conectado (`-1`)

Ajuste os pinos em `src/main.c` se necessário.
