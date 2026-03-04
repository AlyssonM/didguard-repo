# IPFS - Requisitos Funcionais da Camada

## 1. Descrição
Requisitos funcionais para publicação e consulta de documentos por CID.

## 2. Objetivo
- Definir comportamento mínimo para suporte ao fluxo DID.

## 3. Requisitos

### FR-IPFS-01
Deve retornar CID para cada documento publicado.

### FR-IPFS-02
Deve permitir recuperar documento completo por CID.

### FR-IPFS-03
Deve suportar uso como repositorio de DID document para validacoes posteriores.

### FR-IPFS-04
Deve manter compatibilidade com consumo HTTP pela camada de integração.

## 4. Critérios de aceite
1. Documento publicado pode ser recuperado sem perda de estrutura.
2. CID consultado no contrato corresponde ao documento recuperado.

## 5. Bibliografia
- Kubo API reference.
- IPLD basics.




