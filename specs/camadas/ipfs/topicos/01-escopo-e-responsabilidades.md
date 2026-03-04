# IPFS - Escopo e Responsabilidades

## 1. Descrição
Define o papel da camada IPFS no armazenamento de DID document e recuperação por CID.

## 2. Objetivo
- Delimitar responsabilidades de persistência off-chain no DIDGuard.

## 3. Escopo funcional da camada
1. Receber documentos publicados pela camada de integração.
2. Retornar CID para cada publicação.
3. Permitir leitura por CID em tempo de validação.
4. Manter dados entre reinicios por estrategia de volume persistente.

## 4. Fora de escopo da camada
1. Validação de acesso.
2. Políticas administrativas de permissão.
3. Captura de dados biométrico no cliente.

## 5. Bibliografia
- IPFS Concepts.
- CID Specification.






