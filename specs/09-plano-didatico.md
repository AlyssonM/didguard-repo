# 09 - Plano Didático (Equipe com 4 Alunos)

## 1. Descrição
Plano de trabalho para reprodução completa do DIDGuard por uma equipe de 4 alunos, com execução de marco em marco entre marco e julho de 2026.

## 2. Objetivo
- Distribuir responsabilidades técnicas por camada.
- Garantir entregas incrementais com validação objetiva.
- Fechar o ciclo completo: implementação, integração, testes e demonstração final.

## 3. Equipe e papéis

### Equipe 1 - Firmware e hardware (ESP32 + RC522)
- Responsável por fluxo read/write automático, sincronização de tempo, challenge-response no dispositivo e acionamento do relé.
- Requisitos foco: RF-002, RF-003, RF-009, RNF-001, RNF-002.

### Equipe 2 - RelayerNode e APIs
- Responsável por rotas de provisionamento, segurança, biometria (opcional), persistência de dados `.data`.
- Requisitos foco: RF-001, RF-004, RF-010, RF-015, RNF-003, RNF-004, RNF-006.

### Equipe 3 - Blockchain e IPFS (opcional)
- Responsável por contrato, testes Hardhat, registro DID->CID, credenciais e políticas de acesso.
- Requisitos foco: RF-005, RF-006, RF-007, RF-008, RNF-004, RNF-005.

### Orientador - Frontend e operação
- Responsável por telas de cadastro/login/dashboard, biometria no navegador, timeline e UX operacional.
- Requisitos foco: RF-011, RF-012, RF-013, RF-014, RNF-008.

## 4. Cadência de trabalho
- Janela do projeto: 02/03/2026 a 31/07/2026.
- Ritmo semanal: checkpoint técnico de 30-45 min (status, bloqueios, próxima semana).
- Ritmo quinzenal: entrega formal com evidências (código, teste, log, vídeo curto ou print).
- Revisão integrada: ao fim de cada quinzena, todos executam teste ponta a ponta.

## 5. Cronograma quinzenal (marco-julho/2026)

### Q1 - 02/03/2026 a 13/03/2026
- Time: setup de ambiente, leitura dos requisitos e definição de branch strategy.
- Equipe 1: validar build do firmware e leitura NFC básica.
- Equipe 2: validar execução do relayer e rotas principais.
- Equipe 3: validar deploy local do contrato e testes básicos.
- Orientador: validar build do frontend e navegação principal.
- Entrega: ambiente comum funcional + checklist de setup.

### Q2 - 16/03/2026 a 27/03/2026
- Time: consolidar fluxo de provisionamento.
- Equipe 1: write/read automático controlado por janela remota.
- Equipe 2: endpoints de provisioning (`start/status/finish`) com logs.
- Equipe 3: confirmar registro de DID/CID no contrato.
- Orientador: integrar tela de cadastro/provisionamento com feedback.
- Entrega: demo de provisionamento completo (RF-001 a RF-005).

### Q3 - 30/03/2026 a 10/04/2026
- Time: consolidar segurança da TAG.
- Equipe 1: challenge-response e atualização de contador no ESP32.
- Equipe 2: challenge, authorize e commit de sessão no relayer.
- Equipe 3: revisar regra de acesso no contrato para uso real.
- Orientador: exibir eventos e erros de segurança na interface.
- Entrega: acesso por TAG com eventos `authorized/denied` (RF-009).

### Q4 - 13/04/2026 a 24/04/2026
- Time: política de acesso e revogação.
- Equipe 1: validar comportamento do dispositivo em cenários negados.
- Equipe 2: integrar fluxo de concessão/revogação com persistência local.
- Equipe 3: garantir `setAccess` e `revoke` com testes automatizados.
- Orientador: tela de dashboard para conceder e revogar acesso.
- Entrega: concessão + revogação com tx hash e efeito observável (RF-007, RF-008).

### Q5 - 27/04/2026 a 08/05/2026
- Time: biometria de cadastro e autenticação.
- Equipe 1: validar impacto do fluxo biométrico na operação do ESP32.
- Equipe 2: endpoint de login e validação biométrica com mapeamento DID/UID.
- Equipe 3: validar consistência DID/CID para retrieval completo.
- Orientador: captura facial e login biométrico nas telas.
- Entrega: login biométrico funcional (RF-010, RF-011).

### Q6 - 11/05/2026 a 22/05/2026
- Time: biometria para controle de acesso.
- Equipe 1: testes de acesso por biometria x TAG no dispositivo.
- Equipe 2: endpoint de `biometricAccessCheck` consistente com contrato.
- Equipe 3: validar leitura de credencial e expiração no contrato.
- Orientador: botão e fluxo de biometria na área de validação em tempo real.
- Entrega: duas vias de acesso (TAG e biometria) com mesma política (RF-010, RF-014).

### Q7 - 25/05/2026 a 05/06/2026
- Time: resiliência após restart/recreate.
- Equipe 1: validar retomada do firmware após reset.
- Equipe 2: robustecer script de resync e documentar uso.
- Equipe 3: validar reidratação on-chain por dados locais.
- Orientador: exibir estado recuperado no dashboard sem inconsistências visuais.
- Entrega: procedimento de resync validado em bancada (RF-015, RNF-004).

### Q8 - 08/06/2026 a 19/06/2026
- Time: qualidade técnica e testes.
- Equipe 1: roteiro de testes de firmware (casos positivos e negativos).
- Equipe 2: testes de API e tratamento de erro.
- Equipe 3: ampliação de testes de contrato e cobertura de cenários.
- Orientador: testes de fluxo de interface e mensagens de operação.
- Entrega: suite de testes e evidências de regressão.

### Q9 - 22/06/2026 a 03/07/2026
- Time: hardening de segurança e observabilidade.
- Equipe 1: revisar logs de segurança no dispositivo.
- Equipe 2: enriquecer timeline e diagnósticos de negação.
- Equipe 3: revisar regras de acesso e expiração limite.
- Orientador: ajustar UX de feedback (toast/modal/timeline) para operação clara.
- Entrega: pacote de melhorias de confiabilidade e diagnóstico.

### Q10 - 06/07/2026 a 17/07/2026
- Time: ensaio geral de reprodução.
- Equipe 1: executar ciclo completo do lado embarcado.
- Equipe 2: operar relayer e resync em cenário controlado.
- Equipe 3: redeploy local e validação de consistência do contrato.
- Orientador: conduzir operação ponta a ponta pelo frontend.
- Entrega: simulação integral com checklist aprovado.

### Q11 - 20/07/2026 a 31/07/2026
- Time: fechamento e apresentação final.
- Equipe 1: relatório técnico da camada firmware.
- Equipe 2: relatório técnico da camada relayer.
- Equipe 3: relatório técnico da camada blockchain/ipfs.
- Orientador: relatório técnico da camada frontend e usabilidade.
- Entrega: demonstração final + dossiê técnico consolidado.

## 6. Avaliação individual e coletiva
- Entrega técnica da própria camada (individual): 35%.
- Integração com as demais camadas (dupla ou trio por sprint): 25%.
- Qualidade de testes e evidências: 20%.
- Apresentação final e defesa técnica: 20%.

## 7. Evidências mínimas por quinzena
- Commits com mensagem clara e rastreável ao requisito.
- Resultado de testes executados.
- Log ou print do comportamento observado.
- Registro de bloqueios, decisão técnica e ação corretiva.

## 8. Bibliografia pedagógica
- Bloom, B. S. (Taxonomia revisada).
- Biggs, J.; Tang, C. (Constructive Alignment).
- IEEE 29148 (engenharia de requisitos).
- ISO/IEC 25010 (qualidade de software).






