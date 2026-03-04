# 09 - Plano Didático (Equipe com 4 Alunos)

## 1. Descrição
Plano de trabalho para reprodução completa do DIDGuard por uma equipe de 4 alunos, com execução de marco em marco entre marco e julho de 2026.

## 2. Objetivo
- Distribuir responsabilidades técnicas por camada.
- Garantir entregas incrementais com validação objetiva.
- Fechar o ciclo completo: implementação, integração, testes e demonstração final.

## 3. Equipe e papéis

### Aluno 1 - Firmware e hardware (ESP32 + RC522)
- Responsável por fluxo read/write automático, sincronização de tempo, challenge-response no dispositivo e acionamento do relé.
- Requisitos foco: RF-002, RF-003, RF-009, RNF-001, RNF-002.

### Aluno 2 - RelayerNode e APIs
- Responsável por rotas de provisionamento, segurança, biometria, persistência `.data` e resync.
- Requisitos foco: RF-001, RF-004, RF-010, RF-015, RNF-003, RNF-004, RNF-006.

### Aluno 3 - Blockchain e IPFS
- Responsável por contrato, testes Hardhat, registro DID->CID, credenciais e políticas de acesso.
- Requisitos foco: RF-005, RF-006, RF-007, RF-008, RNF-004, RNF-005.

### Aluno 4 - Frontend e operação
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
- Aluno 1: validar build do firmware e leitura NFC básica.
- Aluno 2: validar execução do relayer e rotas principais.
- Aluno 3: validar deploy local do contrato e testes básicos.
- Aluno 4: validar build do frontend e navegação principal.
- Entrega: ambiente comum funcional + checklist de setup.

### Q2 - 16/03/2026 a 27/03/2026
- Time: consolidar fluxo de provisionamento.
- Aluno 1: write/read automático controlado por janela remota.
- Aluno 2: endpoints de provisioning (`start/status/finish`) com logs.
- Aluno 3: confirmar registro de DID/CID no contrato.
- Aluno 4: integrar tela de cadastro/provisionamento com feedback.
- Entrega: demo de provisionamento completo (RF-001 a RF-005).

### Q3 - 30/03/2026 a 10/04/2026
- Time: consolidar segurança da TAG.
- Aluno 1: challenge-response e atualização de contador no ESP32.
- Aluno 2: challenge, authorize e commit de sessão no relayer.
- Aluno 3: revisar regra de acesso no contrato para uso real.
- Aluno 4: exibir eventos e erros de segurança na interface.
- Entrega: acesso por TAG com eventos `authorized/denied` (RF-009).

### Q4 - 13/04/2026 a 24/04/2026
- Time: política de acesso e revogação.
- Aluno 1: validar comportamento do dispositivo em cenários negados.
- Aluno 2: integrar fluxo de concessão/revogação com persistência local.
- Aluno 3: garantir `setAccess` e `revoke` com testes automatizados.
- Aluno 4: tela de dashboard para conceder e revogar acesso.
- Entrega: concessão + revogação com tx hash e efeito observável (RF-007, RF-008).

### Q5 - 27/04/2026 a 08/05/2026
- Time: biometria de cadastro e autenticação.
- Aluno 1: validar impacto do fluxo biométrico na operação do ESP32.
- Aluno 2: endpoint de login e validação biométrica com mapeamento DID/UID.
- Aluno 3: validar consistência DID/CID para retrieval completo.
- Aluno 4: captura facial e login biométrico nas telas.
- Entrega: login biométrico funcional (RF-010, RF-011).

### Q6 - 11/05/2026 a 22/05/2026
- Time: biometria para controle de acesso.
- Aluno 1: testes de acesso por biometria x TAG no dispositivo.
- Aluno 2: endpoint de `biometricAccessCheck` consistente com contrato.
- Aluno 3: validar leitura de credencial e expiração no contrato.
- Aluno 4: botão e fluxo de biometria na área de validação em tempo real.
- Entrega: duas vias de acesso (TAG e biometria) com mesma política (RF-010, RF-014).

### Q7 - 25/05/2026 a 05/06/2026
- Time: resiliência após restart/recreate.
- Aluno 1: validar retomada do firmware após reset.
- Aluno 2: robustecer script de resync e documentar uso.
- Aluno 3: validar reidratação on-chain por dados locais.
- Aluno 4: exibir estado recuperado no dashboard sem inconsistências visuais.
- Entrega: procedimento de resync validado em bancada (RF-015, RNF-004).

### Q8 - 08/06/2026 a 19/06/2026
- Time: qualidade técnica e testes.
- Aluno 1: roteiro de testes de firmware (casos positivos e negativos).
- Aluno 2: testes de API e tratamento de erro.
- Aluno 3: ampliação de testes de contrato e cobertura de cenários.
- Aluno 4: testes de fluxo de interface e mensagens de operação.
- Entrega: suite de testes e evidências de regressão.

### Q9 - 22/06/2026 a 03/07/2026
- Time: hardening de segurança e observabilidade.
- Aluno 1: revisar logs de segurança no dispositivo.
- Aluno 2: enriquecer timeline e diagnósticos de negação.
- Aluno 3: revisar regras de acesso e expiração limite.
- Aluno 4: ajustar UX de feedback (toast/modal/timeline) para operação clara.
- Entrega: pacote de melhorias de confiabilidade e diagnóstico.

### Q10 - 06/07/2026 a 17/07/2026
- Time: ensaio geral de reprodução.
- Aluno 1: executar ciclo completo do lado embarcado.
- Aluno 2: operar relayer e resync em cenário controlado.
- Aluno 3: redeploy local e validação de consistência do contrato.
- Aluno 4: conduzir operação ponta a ponta pelo frontend.
- Entrega: simulação integral com checklist aprovado.

### Q11 - 20/07/2026 a 31/07/2026
- Time: fechamento e apresentação final.
- Aluno 1: relatório técnico da camada firmware.
- Aluno 2: relatório técnico da camada relayer.
- Aluno 3: relatório técnico da camada blockchain/ipfs.
- Aluno 4: relatório técnico da camada frontend e usabilidade.
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





