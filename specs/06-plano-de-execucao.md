# 06 - Plano de Execução do Projeto

## 1. Descrição
Roteiro de execução do DIDGuard do zero, em ambiente local.

## 2. Objetivo
- Permitir que os alunos executem a stack completa com validação objetiva.
- Garantir padronização mínima de workstation antes dos fluxos funcionais.

## 3. Pre-requisitos
- Docker Desktop + Compose
- Node.js/Bun
- Python
- Antigravity (ou IDE compatível com instalação por VSIX)
- ESP32 + RC522 + TAG NFC
- Câmera para biometria opcional (frontend)

## 4. Fase 0 - Setup da workstation
1. Instalar Antigravity usando o instalador oficial disponibilizado pela disciplina.
2. Instalar a extensão local disponível no repositório:
   - `extensions/platformio.platformio-ide-3.3.4-win32-x64.vsix`
3. Validar ferramentas base:
   - `git --version`
   - `docker --version`
   - `node --version`
   - `python --version`

## 5. Fase A - Subir infraestrutura (Quando minimamente funcional)
1. Raiz do projeto:
   - `docker compose up -d --build`
2. Validar containers:
   - `docker compose ps`
3. Validar relayer:
   - `Invoke-RestMethod "http://localhost:3000/api/time"`

## 6. Fase B - Frontend (Quando minimamente funcional)
1. `cd Frontend`
2. `bun install`
3. `bun run dev`
4. Abrir `http://localhost:3001`

## 7. Fase C - Firmware (Quando minimamente funcional)
1. Abrir `esp32-firmware` no Antigravity.
2. Usar a extensão PlatformIO (instalada por VSIX) para `Build` e `Upload`.
3. Abrir monitor serial pela própria extensão (baud `115200`).
4. Confirmar:
   - Wi-Fi conectado
   - tempo sincronizado
   - RC522 inicializado

## 8. Fase D - Provisionar usuário (com ou sem biometria)
1. No frontend, abrir `/signup`.
2. Clicar em "Iniciar provisionamento" (ou variante com biometria).
3. Aproximar TAG no leitor.
4. Confirmar:
   - evento em `/api/provisioning/events`
   - DID com CID registrado (`/api/getDidCid`)

## 9. Fase E - Conceder acesso e validar
1. Ir ao dashboard admin.
2. Definir acesso para `tagDid + tagUid + deviceId`.
3. Testar acesso por TAG (ESP32).
4. Testar acesso por biometria (dashboard).
5. Confirmar eventos em `/api/security/events`.

## 10. Fase F - Revogação e negação
1. No dashboard, usar "Revogar TAG".
2. Repetir tentativa por TAG e biometria.
3. Resultado esperado: acesso negado.

## 11. Evidências mínimas de execução
- Captura de logs do ESP32.
- Respostas de API principais.
- Hashes de transação retornados em `setAccess/revoke`.
- Timeline com eventos coerentes.

## 12. Bibliografia
- Docker Compose docs.
- PlatformIO docs.
- Hardhat local network docs.
- VS Code docs (Install from VSIX).
