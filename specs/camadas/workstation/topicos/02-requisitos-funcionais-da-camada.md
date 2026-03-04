# Workstation - Requisitos Funcionais da Camada

## 1. Descrição
Requisitos funcionais para preparação e validação da estação de trabalho.

## 2. Objetivo
- Definir uma sequência mínima e verificável de setup técnico para o projeto.

## 3. Requisitos

### FR-WS-01
Deve validar instalação de ferramentas base no host local.
- Aceite: `git --version`, `docker --version`, `node --version`, `python --version`, `bun --version` retornam sucesso.

### FR-WS-02
Deve instalar a IDE Antigravity conforme o instalador oficial.
- Aceite: IDE abre sem erro.

### FR-WS-03
Deve instalar a extensão do PlatformIO em formato VSIX.
- Aceite: o pacote abaixo fica habilitado na IDE:
  - `extensions/platformio.platformio-ide-3.3.4-win32-x64.vsix`

### FR-WS-04
Deve instalar dependências de software por módulo.
- Aceite:
  - `Frontend`: `bun install`
  - `RelayerNode`: `npm install`
  - `Blockchain`: `npm install`
  - `ESP32Device.pio`: build do firmware exemplo executado pela extensão PlatformIO (VSIX).


## 4. Critérios de aceite
1. Ambiente pronto para executar o plano `06-plano-de-execucao.md`.
2. IDE com extensões disponíveis e funcionais.
3. Dependências instaladas sem bloqueios críticos.

## 5. Bibliografia
- Bun Runtime Docs.
- npm CLI Docs.
- PlatformIO IDE Docs.
