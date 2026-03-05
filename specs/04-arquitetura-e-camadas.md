# 04 - Arquitetura e Camadas

## 1. Descrição
Visao arquitetural do DIDGuard na versão de referência do projeto.

## 2. Objetivo
- Explicar responsabilidades por camada e fluxo entre componentes.

## 3. Camadas
1. **Workstation (ambiente de desenvolvimento)**
   - Setup de ferramentas, IDE, extensões e dependências por módulo.
2. **Firmware (ESP32 + RC522)**
   - Leitura/escrita NFC, MAC, contador e challenge-response (opcional).
3. **Relayer (Node.js/Express ou Python/FastAPI)**
   - API de orquestração, persistência local e integração on/off-chain.
4. **Blockchain (Hardhat + Solidity)**
   - Política de acesso e mapeamento DID->CID.
5. **IPFS (Kubo) Recomendado**
   - Armazenamento de DID Document completo por CID.
6. **Frontend (Next.js)**
   - Provisionamento assistido, dashboard admin, biometria e timeline.

## 4. Fluxos principais

### 4.0 Setup de ambiente
`Workstation(instalação base) -> IDE/Extensões -> Dependências por módulo -> docker compose + builds locais`

### 4.1 Provisionamento
`Frontend -> Relayer(start) -> ESP32(status) -> TAG(write) -> Relayer(uploadDid) -> IPFS (opcional) + Blockchain -> Relayer(finish) -> Frontend(events)`

### 4.2 Acesso por TAG
`ESP32(read) -> Relayer(challenge) -> ESP32(proof) -> Relayer(authorize) -> Blockchain(hasAccessDebug) -> ESP32(commit local + remote)`

### 4.3 Acesso por biometria (opcional)
`Frontend(captura embedding) -> Relayer(biometricAccessCheck) -> IPFS(recupera docs) -> Blockchain(hasAccessDebug) -> Frontend(resultado + timeline)`

### 4.4 Recuperação após recreate
`Relayer(.data) -> script resync -> Blockchain`

## 5. Decisoes arquiteturais relevantes
- CID no contrato, documento completo no IPFS (opcional).
- Relayer como writer único on-chain.

## 6. Bibliografia
- C4 Model (Simon Brown).
- Martin Fowler - Patterns of Enterprise Application Architecture.
- IPFS architecture docs.






