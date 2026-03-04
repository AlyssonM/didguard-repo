# IPFS - Requisitos Não Funcionais da Camada

## 1. Descrição
Requisitos de qualidade para operação de armazenamento descentralizado local.

## 2. Objetivo
- Garantir disponibilidade e persistência da camada durante laboratorios.

## 3. Requisitos de qualidade

### NFR-IPFS-01 - Persistência
Dados devem sobreviver a restart de container sem perda de CID.

### NFR-IPFS-02 - Acessibilidade local
API e gateway devem estar disponíveis para integração local.

### NFR-IPFS-03 - Reprodutibilidade
Subida da camada deve ser padronizada por compose.

## 4. Critérios de verificação
1. CID conhecido e recuperado após reinicio da stack.
2. Consultas de API e gateway respondem conforme esperado.

## 5. Bibliografia
- Docker Volumes documentation.
- IPFS persistence concepts.






