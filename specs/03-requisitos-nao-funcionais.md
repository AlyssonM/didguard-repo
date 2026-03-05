# 03 - Requisitos Não Funcionais (RNF)

## 1. Descrição
Requisitos de qualidade para reprodução e avaliação do DIDGuard.

## 2. Objetivo
- Garantir padrão mínimo de segurança, desempenho e operabilidade.

## 3. Requisitos

### RNF-001 - Integridade criptografica
Dados criticos em TAG devem incluir MAC e contador verificavel.
- Evidencia: blocos `BLOCK_MAC`, `BLOCK_MAC_UID`, `BLOCK_SECURITY_STATE`.

### RNF-002 - Controle de tempo
Provisionamento deve falhar se tempo do ESP32 estiver invalido.
- Evidencia: validação de epoch minima no firmware.

### RNF-003 - Auditabilidade
Eventos de segurança e provisionamento devem ser persistidos em `.data`.
- Evidencia: `securityEvents.json` e `provisioningEvents.json`.

### RNF-004 - Recuperabilidade
Estado on-chain deve ser recuperável por script de resync.
- Evidencia: `scripts/resync-from-data.js`.

### RNF-005 - Disponibilidade local
Stack deve operar via Docker Compose com reinicio de servicos.
- Evidencia: `docker-compose.yml` e health checks operacionais.

### RNF-006 - Modularidade
Relayer deve manter separacao por rotas/contexto para manutencao.
- Evidencia: `RelayerNode/src/routes/*.js` e `src/context.js`.

### RNF-007 - Usabilidade operacional
Dashboard deve permitir tarefas administrativas sem uso de scripts manuais para operação básica.
- Evidencia: concessão/revogação, timeline e biometria no frontend.

## 4. Metricas sugeridas para aula
- Tempo médio de provisionamento por TAG.

## 5. Bibliografia
- ISO/IEC 25010 (qualidade de software).
- OWASP IoT Top 10.
- NIST SP 800-53 (controles de segurança, referência conceitual).





