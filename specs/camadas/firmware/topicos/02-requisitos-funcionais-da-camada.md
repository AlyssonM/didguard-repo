# Firmware - Requisitos Funcionais da Camada

## 1. Descrição
Lista de requisitos funcionais especificos da camada firmware.

## 2. Objetivo
- Traduzir comportamento esperado em critérios verificáveis em bancada.

## 3. Requisitos

### FR-FW-01
O firmware deve consultar status de provisionamento remoto antes de decidir entre modo write e read.
- Aceite: em janela ativa, entra em write; fora da janela, permanece em read.

### FR-FW-02
No modo write, o firmware deve gravar na TAG os campos minimos de identidade e segurança.
- Aceite: campos essenciais disponíveis para validação posterior.

### FR-FW-03
Após write bem-sucedido, o firmware deve iniciar estado de segurança da TAG e encerrar a janela de provisionamento.
- Aceite: tentativa de init e finish com retorno de sucesso.

### FR-FW-04
No modo read, o firmware deve validar estado da TAG (counter/MAC) antes de solicitar autorização.
- Aceite: tags com estado invalido devem ser rejeitadas.

### FR-FW-05
O firmware deve executar challenge-response completo e atualizar counter local somente quando autorizado.
- Aceite: somente respostas `allowed=true` resultam em incremento/commit.

### FR-FW-06
O firmware deve acionar relé por tempo controlado apenas em autorização positiva.
- Aceite: relé não deve ser acionado em casos negados ou erro.

## 4. Bibliografia
- ISO/IEC/IEEE 29148 (especificação de requisitos).
- Documentacao de eventos no ESP-IDF.






