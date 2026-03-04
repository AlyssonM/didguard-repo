# didguard-repo

Repositório ponto de partida para estudos e implementação incremental do DIDGuard por camadas.

## Visão geral
Este repositório organiza exemplos e módulos-base para:
- `backend/blockchain`: exemplo Hardhat + contrato `Greeter`.
- `backend/relayer`: exemplo Node.js/Express com endpoints hello world.
- `esp32-firmware`: exemplo PlatformIO (ESP-IDF) com RC522.
- `frontend`: espaço para aplicação web.
- `specs`: plano de trabalho e especificações didáticas.

## Estrutura
```text
didguard-repo/
  backend/
    blockchain/
    relayer/
  esp32-firmware/
  frontend/
  specs/
```

## Pré-requisitos
- Git
- Docker Desktop (com Compose)
- Node.js 20+ e npm
- Bun (frontend, se aplicável)
- Antigravity/VS Code + extensões VSIX
- Python (suporte de ferramentas locais quando necessário)

## Início rápido

### 1) Blockchain (exemplo Greeter)
```powershell
cd backend/blockchain
npm install
npm run compile
npm run test
```

Deploy local (opcional):
```powershell
# terminal 1
npm run node

# terminal 2
npm run deploy:localhost
```

### 2) Relayer (exemplo hello world)
```powershell
cd backend/relayer
npm install
npm start
```

Teste de endpoints:
```powershell
curl http://localhost:3000/api/health
curl http://localhost:3000/api/time
curl http://localhost:3000/api/hello/Alysson
curl -X POST http://localhost:3000/api/echo -H "Content-Type: application/json" -d "{\"demo\":true}"
```

### 3) Firmware (exemplo RC522)
```powershell
cd esp32-firmware
pio run
pio run -t upload
pio device monitor --baud 115200
```

## Documentação
A trilha principal está em:
- `specs/README.md`
- `specs/06-plano-de-execucao.md`
- `specs/camadas/workstation/topicos/05-guia-instalacao-e-configuracao.md`

## Próximos passos sugeridos
1. Implementar frontend inicial em `frontend/`.
2. Integrar `backend/relayer` com `backend/blockchain`.
3. Evoluir contrato `Greeter` para casos de uso de controle de acesso.
