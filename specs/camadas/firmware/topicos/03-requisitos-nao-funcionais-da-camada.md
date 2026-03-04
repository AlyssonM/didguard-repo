# Firmware - Requisitos Não Funcionais da Camada

## 1. Descrição
Define qualidades técnicas esperadas para a camada embarcada.

## 2. Objetivo
- Garantir robustez operacional e segurança minima no dispositivo.

## 3. Requisitos de qualidade

### NFR-FW-01 - Integridade
O estado da TAG deve ser validado criptograficamente antes da autorização.

### NFR-FW-02 - Confiabilidade temporal
Provisionamento deve depender de tempo valido/sincronizado.

### NFR-FW-03 - Resiliência de leitura
Leitura de blocos NFC deve tolerar falhas transitivas (tentativas controladas).

### NFR-FW-04 - Determinismo operacional
A camada deve ter comportamento previsivel em cada estado (write/read).

### NFR-FW-05 - Segurança de atuacao
Acionamento de relé deve ser condicionado a autorização explícita.

## 4. Critérios de verificação
1. Logs mostram transição de estados sem ambiguidade.
2. Falhas de tempo bloqueiam write/provision.
3. Falhas de MAC/counter bloqueiam authorize.

## 5. Bibliografia
- OWASP IoT Top 10.
- NISTIR 8259A (baseline de segurança para dispositivos IoT).







