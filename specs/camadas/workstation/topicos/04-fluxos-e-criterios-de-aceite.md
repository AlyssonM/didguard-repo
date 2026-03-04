# Workstation - Fluxos e Critérios de Aceite

## 1. Descrição
Define o fluxo operacional para preparar a workstation e validar prontidão para o DIDGuard.

## 2. Objetivo
- Garantir que o ambiente de desenvolvimento esteja apto para execução do projeto.
- Consolidar os critérios de aceite do guia detalhado em `05-guia-instalacao-e-configuracao.md`.

## 3. Fluxo A - Ferramentas base
1. Instalar Git, Docker Desktop, Node.js, Bun e Python.
2. Validar versões das ferramentas.

### Aceite
- Todos os comandos de versão retornam sucesso.

## 4. Fluxo B - IDE Antigravity e extensões VSIX
1. Instalar Antigravity conforme pacote oficial da disciplina.
2. Abrir o workspace do projeto na IDE.
3. Instalar a extensão do PlatformIO local da pasta `extensions/`:
   - `platformio.platformio-ide-3.3.4-win32-x64.vsix`

### Aceite
- IDE carrega o projeto e reconhece a extensão instalada.

## 5. Fluxo C - Dependências por módulo
1. Executar instalação de pacotes no `Frontend`, `RelayerNode` e `Blockchain`.
2. Executar compilação inicial em `ESP32Device.pio` pela extensão PlatformIO.

### Aceite
- Não há erro crítico de dependência ausente.

## 6. Fluxo D - Smoke test integrado
1. Subir containers com `docker compose up -d --build`.
2. Validar health básico do relayer (`/api/time`).
3. Confirmar build do frontend e toolchain do firmware.

### Aceite
- Ambiente liberado para seguir `specs/06-plano-de-execucao.md`.

## 7. Bibliografia
- Docker Compose Docs.
- VS Code Docs (Install from VSIX).
- PlatformIO IDE Docs.
