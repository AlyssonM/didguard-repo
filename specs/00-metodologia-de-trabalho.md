# 00 - Metodologia de Trabalho

## 1. Descrição
Documento que define a forma de uso e evolucao da pasta `specs/` como plano oficial de trabalho do DIDGuard.

## 2. Objetivo
- Padronizar como requisitos, arquitetura e validacoes sao documentados.
- Garantir consistência entre implementação, testes e entregas do projeto.

## 3. Metodo de trabalho
1. Planejamento:
   - definir escopo, prioridades e critérios de aceite.
2. Especificação:
   - registrar requisitos funcionais e não funcionais.
3. Implementação:
   - desenvolver por camada (firmware, relayer, blockchain, frontend).
4. Verificação:
   - executar testes técnicos e validar evidências.
5. Rastreabilidade:
   - manter matriz requisito -> artefato -> validação.

## 4. Premissas
- Ambiente alvo: desenvolvimento local com Docker + Hardhat.
- Relayer como componente de integração entre camadas.
- Frontend e firmware consumindo API HTTP do relayer.

## 5. Limites da especificação
- Não cobre governanca de rede pública Ethereum.
- Não substitui compliance jurídico (ex.: LGPD), apenas orienta tecnicamente.

## 6. Bibliografia de metodo
- ISO/IEC/IEEE 29148:2018 (Requirements Engineering).
- ISO/IEC 25010:2011 (Software Quality Model).
- Ian Sommerville. Software Engineering.





