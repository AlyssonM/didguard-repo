# 08 - Matriz de Rastreabilidade

## 1. Descrição
Relaciona requisitos com camadas, entregáveis esperados e critérios de validação.

## 2. Objetivo
- Guiar a construção incremental do projeto sem depender de artefatos pré-existentes.
- Facilitar auditoria didática e avaliação do que foi implementado.

## 3. Como usar esta matriz
1. Para cada requisito, criar os artefatos necessários na camada indicada.
2. Os nomes de arquivos abaixo são sugestões, não obrigação.
3. A validação deve ser feita por evidência funcional (execução, resposta de API, log, teste).
4. Só marcar requisito como concluído quando houver evidência mínima registrada.

## 4. Matriz de construção e rastreabilidade
### RF-001 e RF-003
- Camada principal: Relayer / Firmware
- Entregáveis esperados: endpoint de janela de provisionamento; lógica de entrada/saída de modo de provisionamento no firmware
- Evidência mínima: fluxo `start/status/finish` executa sem erro e com transição de estado correta

### RF-004 e RF-005
- Camada principal: Relayer / IPFS / Blockchain
- Entregáveis esperados: registro DID->CID no contrato; persistência e consulta de DID Document no IPFS
- Evidência mínima: consulta de CID por DID retorna valor válido e documento recuperável

### RF-006
- Camada principal: Blockchain
- Entregáveis esperados: funções de cadastro e leitura de credenciais de TAG
- Evidência mínima: credencial cadastrada aparece em consulta de credenciais

### RF-007
- Camada principal: Dashboard / Relayer / Contrato
- Entregáveis esperados: interface para concessão de acesso; endpoint/função de escrita no contrato
- Evidência mínima: após concessão, validação de acesso retorna permitido

### RF-008
- Camada principal: Dashboard / Relayer / Contrato
- Entregáveis esperados: interface para revogação; endpoint/função de revogação
- Evidência mínima: após revogação, validação de acesso retorna negado

### RF-009
- Camada principal: Firmware / Relayer
- Entregáveis esperados: fluxo de autorização no firmware; endpoint de verificação de segurança no relayer
- Evidência mínima: eventos de autorização/negação gerados com consistência

### RF-010
- Camada principal: Frontend / Relayer
- Entregáveis esperados: captura facial; endpoint de validação biométrica
- Evidência mínima: retorno de validação biométrica com `allowed`, `tagDid` e `tagUid`

### RF-011
- Camada principal: Frontend / Relayer
- Entregáveis esperados: fluxo de login biométrico para usuário e perfil administrativo
- Evidência mínima: login biométrico funcional com feedback de sucesso/erro

### RF-012
- Camada principal: Relayer / Frontend
- Entregáveis esperados: cadastro/listagem de dispositivos no backend e dashboard
- Evidência mínima: inclusão e listagem de dispositivo funcionando na interface

### RF-013
- Camada principal: Relayer / Frontend
- Entregáveis esperados: busca de registros de identidade por DID, nome ou matrícula/SIAPE
- Evidência mínima: resultado de busca coerente com filtros informados

### RF-014
- Camada principal: Relayer / Frontend
- Entregáveis esperados: coleta e exibição de eventos de segurança em timeline
- Evidência mínima: timeline atualiza com eventos reais de uso


## 5. Registro de evidências (obrigatório)
- Para cada RF, anexar:
  - data da validação;
  - responsável;
  - comando/ação executada;
  - resultado observado;
  - referência de evidência (print, log, resposta JSON ou vídeo curto).

## 6. Critérios globais de aceite
1. Todos os testes de fluxo em `06-plano-de-execucao.md` concluídos.
2. Evidências de API e logs arquivadas.
3. Nenhum requisito RF crítico sem evidência.

## 7. Bibliografia
- IEEE 29148 (Requirements Engineering).
- V-Model de verificação e validação.
