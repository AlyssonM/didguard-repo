# Blockchain - Requisitos Não Funcionais da Camada

## 1. Descrição
Define requisitos de qualidade e segurança para a camada on-chain.

## 2. Objetivo
- Garantir previsibilidade e auditabilidade da lógica de acesso.

## 3. Requisitos de qualidade

### NFR-BC-01 - Determinismo
As consultas de acesso devem ser deterministicas para a mesma entrada e estado de bloco.

### NFR-BC-02 - Auditabilidade
Eventos relevantes devem permitir trilha de alteracoes administrativas.

### NFR-BC-03 - Integridade temporal
Validacoes de expiração devem usar timestamp da cadeia.

### NFR-BC-04 - Simplicidade de integração
A interface de leitura deve ser suficiente para diagnóstico sem heurísticas externas.

## 4. Critérios de verificação
1. Testes de expiração passam em ambiente local.
2. Eventos de alteracao de acesso e credencial sao emitidos.
3. Consulta de debug reflete estado esperado após cada transação.

## 5. Bibliografia
- ISO/IEC 25010.
- Boas práticas de segurança para contratos inteligentes.







