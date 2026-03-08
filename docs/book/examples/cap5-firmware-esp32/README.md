# Laboratorio do Capitulo 5

Este laboratorio mostra a estrutura minima de um firmware em PlatformIO usando ESP-IDF para:
- inicializar Wi-Fi em modo estacao;
- integrar o RC522 como componente gerenciado pelo ESP-IDF;
- gerar uma chave eliptica local;
- derivar um DID e serializar um DID Document simplificado.

## Requisitos
- PlatformIO instalado
- toolchain `espressif32` disponivel
- placa ESP32 compativel

## Arquivos
- `platformio.ini`
- `sdkconfig.defaults`
- `CMakeLists.txt`
- `src/CMakeLists.txt`
- `src/idf_component.yml`
- `src/main.c`
- `include/lab_config.h`

## Execucao

```bash
pio run
pio run -t upload
pio device monitor
```

## Resultado esperado
- logs de inicializacao de NVS, rede e Wi-Fi;
- logs de inicializacao do driver e do scanner RC522;
- deteccao de uma tag via eventos da biblioteca;
- impressao do DID gerado e do documento JSON.
