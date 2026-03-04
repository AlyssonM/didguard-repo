# Frontend - Fluxos e Critérios de Aceite

## 1. Descrição
Define fluxos operacionais da interface e seus critérios de aprovacao.

## 2. Objetivo
- Validar que a camada frontend suporta operação completa do sistema.

## 3. Fluxo A - Cadastro com biometria e provisionamento
1. Operador abre tela de cadastro.
2. Captura biometria facial.
3. Inicia janela de provisionamento.
4. Acompanha resultado do registro de DID.

### Aceite
- Fluxo retorna confirmacao de cadastro e identificador de transação.
- Estado fica disponivel para consulta posterior no dashboard.

## 4. Fluxo B - Concessão de acesso por painel
1. Operador busca usuário por nome/matrícula/DID.
2. Seleciona dispositivo e validade.
3. Aciona comando de concessão.
4. Recebe feedback com hash de transação.

### Aceite
- Usuário passa a aparecer como autorizado no ciclo seguinte de validação.

## 5. Fluxo C - Revogação de TAG
1. Operador seleciona usuário e contexto da TAG.
2. Aciona comando de revogação.
3. Confirma retorno da transação.

### Aceite
- Tentativas posteriores da TAG revogada resultam em negação.

## 6. Fluxo D - Validação em tempo real (TAG e biometria)
1. Timeline em modo de monitoramento.
2. Evento de TAG ou botão de biometria dispara validação.
3. Resultado aparece com usuário, dispositivo e motivo.

### Aceite
- Eventos autorizados e negados aparecem com diagnóstico consistente.

## 7. Bibliografia
- Boas práticas de observabilidade para sistemas web.
- Material de UX para dashboards operacionais.




