# Blockchain - Fluxos e Critérios de Aceite

## 1. Descrição
Fluxos de negocio da camada on-chain e respectivos critérios de aprovacao.

## 2. Objetivo
- Facilitar avaliação prática da consistência de regras no contrato.

## 3. Fluxo A - Registro de DID
1. Receber identificador do DID e CID.
2. Persistir mapeamento.
3. Registrar metadados de prova.

### Aceite
- Consulta de CID retorna valor esperado para o DID.

## 4. Fluxo B - Credencial de TAG
1. Inserir credencial com validade.
2. Consultar lista de credenciais.
3. Revogar credencial quando necessario.

### Aceite
- Credencial revogada não deve produzir autorização positiva.

## 5. Fluxo C - Política de acesso
1. Definir acesso por dispositivo e DID.
2. Validar autorização com diagnóstico.

### Aceite
- Acesso respeita expiração e associacao correta de UID.

## 6. Bibliografia
- Hardhat testing patterns.
- Smart contract verification methodologies.





