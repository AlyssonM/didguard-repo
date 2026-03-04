# Camada - Blockchain

## Descrição
Especificação da camada on-chain que armazena vínculos de identidade e políticas de acesso.

## Requisitos aplicaveis
- RF-005, RF-006, RF-007, RF-008
- RNF-003, RNF-004

## Comportamento esperado
1. Registrar DID (CID + proof).
2. Registrar e revogar credenciais de TAG.
3. Aplicar regra de acesso por device com expiração.
4. Retornar diagnóstico de autorização por `hasAccessDebug`.

## Topicos detalhados
- `blockchain/README.md`
- `blockchain/topicos/01-escopo-e-responsabilidades.md`
- `blockchain/topicos/02-requisitos-funcionais-da-camada.md`
- `blockchain/topicos/03-requisitos-nao-funcionais-da-camada.md`
- `blockchain/topicos/04-fluxos-e-criterios-de-aceite.md`

## Bibliografia
- Solidity docs.
- Hardhat docs.
- Boas práticas de segurança em smart contracts.




