# Camada - Firmware (ESP32)

## Descrição
Especificação da camada embarcada responsável por operação NFC e protocolo de segurança.

## Requisitos aplicaveis
- RF-002, RF-003, RF-009
- RNF-001, RNF-002

## Comportamento esperado
1. Detectar TAG ativa.
2. Consultar status de provisionamento no relayer.
3. Se ativo: modo write e registro inicial.
4. Se inativo: modo read com challenge-response.
5. Acionar relé apenas em autorização positiva.

## Topicos detalhados
- `firmware/README.md`
- `firmware/topicos/01-escopo-e-responsabilidades.md`
- `firmware/topicos/02-requisitos-funcionais-da-camada.md`
- `firmware/topicos/03-requisitos-nao-funcionais-da-camada.md`
- `firmware/topicos/04-fluxos-e-criterios-de-aceite.md`

## Bibliografia
- ESP-IDF docs.
- RFC 2104 (HMAC).
- Material técnico MIFARE Classic.




