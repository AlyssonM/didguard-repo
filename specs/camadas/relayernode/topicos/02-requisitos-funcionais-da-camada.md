# RelayerNode - Requisitos Funcionais da Camada

## 1. Descrição
Requisitos funcionais para operação do backend de integração.

## 2. Objetivo
- Definir comportamento mínimo obrigatório da API.

## 3. Requisitos

### FR-RN-01
Deve disponibilizar janela de provisionamento com início, status e encerramento.

### FR-RN-02
Deve aceitar upload de DID document e publicar no IPFS.

### FR-RN-03
Deve registrar/consultar mapeamento DID-CID no contrato.

### FR-RN-04
Deve suportar concessão e revogação de acesso.

### FR-RN-05
Deve executar challenge-response para acesso por TAG.

### FR-RN-06
Deve executar validação de acesso por biometria, retornando DID/UID resolvidos.

### FR-RN-07
Deve registrar eventos de segurança e provisionamento para timeline.

### FR-RN-08
Deve suportar resync para restaurar estado on-chain.

## 4. Critérios de aceite
1. Endpoints retornam respostas coerentes e status HTTP adequado.
2. Fluxos de provisioning, access e revoke geram eventos verificáveis.
3. Resync recupera CID, credenciais e políticas de acesso.

## 5. Bibliografia
- RFC 7231 (HTTP semantics).
- OpenAPI Specification.





