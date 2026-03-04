# Blockchain - Requisitos Funcionais da Camada

## 1. Descrição
Define os requisitos funcionais da camada de contrato inteligente.

## 2. Objetivo
- Tornar verificavel o comportamento on-chain esperado.

## 3. Requisitos

### FR-BC-01
Deve permitir registrar/atualizar o CID de um DID.

### FR-BC-02
Deve permitir incluir credenciais de TAG por DID.

### FR-BC-03
Deve permitir revogar credencial sem remover historico estrutural.

### FR-BC-04
Deve permitir definir acesso por par DID-dispositivo com validade temporal.

### FR-BC-05
Deve fornecer consulta de autorização com diagnóstico detalhado.

### FR-BC-06
Deve disponibilizar consultas de credenciais, prova e CID.

## 4. Critérios de aceite
1. Concessão valida retorna autorização positiva dentro da expiração.
2. Revogação impede autorização subsequente da TAG.
3. Diagnóstico informa estado de UID e timestamps relevantes.

## 5. Bibliografia
- Ethereum ABI/Events references.
- Hardhat testing references.





