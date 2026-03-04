# Camada - RelayerNode

## Descrição
Especificação da camada de serviço HTTP que integra firmware, IPFS e contrato.

## Requisitos aplicaveis
- RF-001, RF-004, RF-005, RF-006, RF-007, RF-008, RF-010, RF-012, RF-013, RF-014, RF-015
- RNF-003, RNF-004, RNF-006

## Comportamento esperado
1. Expor APIs para provisionamento, segurança, DID e administração.
2. Persistir estados auxiliares em `.data`.
3. Publicar DID docs no IPFS e registrar CID no contrato.
4. Validar acesso via `hasAccessDebug` do contrato.
5. Suportar resync após recreates.

## Topicos detalhados
- `relayernode/README.md`
- `relayernode/topicos/01-escopo-e-responsabilidades.md`
- `relayernode/topicos/02-requisitos-funcionais-da-camada.md`
- `relayernode/topicos/03-requisitos-nao-funcionais-da-camada.md`
- `relayernode/topicos/04-fluxos-e-criterios-de-aceite.md`

## Bibliografia
- Express.js.
- ethers.js.
- Node.js design patterns.




