# 05 - Interfaces e Contratos

## 1. Descrição
Especifica interfaces entre camadas: API HTTP do relayer, funções do contrato e layout funcional da TAG.

## 2. Objetivo
- Reduzir ambiguidades de integração.
- Facilitar testes de caixa-preta por endpoint e contrato.

## 3. API do Relayer (resumo)

### Provisionamento
- `POST /api/provisioning/start`
- `GET /api/provisioning/status`
- `POST /api/provisioning/finish`
- `GET /api/provisioning/events`
- `POST /api/provisioning/attachKyc`

### DID/Credenciais
- `POST /api/uploadDidDocument`
- `GET /api/getDidCid`
- `GET /api/getTagCredentials`
- `GET /api/getDidDocument`
- `POST /api/revokeCredential`

### Acesso e segurança
- `POST /api/setAccess`
- `GET /api/hasAccess`
- `POST /api/security/initTag`
- `GET /api/security/challenge`
- `POST /api/security/authorize`
- `POST /api/security/commit`
- `POST /api/security/biometricAccessCheck`
- `GET /api/security/events`

### Dispositivos e busca
- `GET /api/devices`
- `POST /api/devices`
- `GET /api/didRegistrySearch`

## 4. Contrato Solidity (funções usadas)
- `registerTagDID(bytes32,string,string,string)`
- `addTagCredential(bytes32,bytes32,string,uint256,string)`
- `revokeTagCredential(bytes32,bytes32)`
- `setAccess(bytes32,bytes32,bytes32,bool,uint256)`
- `hasAccess(bytes32,bytes32,bytes32)`
- `getTagCredentials(bytes32)`
- `getProofInfo(bytes32)`
- `getCidFromDID(bytes32)`

## 5. Layout funcional da TAG (MIFARE classic)
- `BLOCK_DID = 1`
- `BLOCK_TIME = 2`
- `BLOCK_MAC = 4`
- `BLOCK_MAC_UID = 13`
- `BLOCK_SECURITY_STATE = 14`
- `BLOCK_UID_SIG_START = 16`

## 6. Regras de compatibilidade
- `tagDid`, `tagUid`, `deviceId` devem ser coerentes entre firmware, relayer e contrato.
- Mudança de ABI/funções do contrato exige revisar relayer + resync.

## 7. Bibliografia
- OpenAPI Specification.
- FastAPI Docs.
- Ethereum ABI Specification.
- ISO/IEC 14443 e MIFARE Classic docs.




