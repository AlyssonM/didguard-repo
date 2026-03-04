# Blockchain - Escopo e Responsabilidades

## 1. Descrição
Especifica o papel da camada on-chain como fonte de verdade para autorização e vinculacao de identidade.

## 2. Objetivo
- Definir claramente o que e persistido em contrato.
- Separar responsabilidades de armazenamento on-chain e off-chain.

## 3. Escopo funcional da camada
1. Registrar DID e metadados de prova.
2. Registrar credenciais de TAG por DID.
3. Aplicar políticas de acesso por dispositivo com expiração.
4. Revogar credenciais de TAG.
5. Fornecer diagnóstico de autorização para consumo do relayer.

## 4. Fora de escopo da camada
1. Captura de biometria.
2. Interface administrativa.
3. Armazenamento completo de documento (feito em IPFS).

## 5. Bibliografia
- Solidity Language Documentation.
- Ethereum smart contract design references.





