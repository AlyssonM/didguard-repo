# Firmware - Fluxos e Critérios de Aceite

## 1. Descrição
Define os fluxos operacionais da camada firmware e seus critérios de aprovacao.

## 2. Objetivo
- Permitir validação prática da camada em laboratório.

## 3. Fluxo A - Provisionamento automático
1. Janela de provisionamento ativa no relayer.
2. TAG aproximada no leitor.
3. Firmware entra em write e inicializa segurança.
4. Janela e encerrada no relayer.

### Aceite
- A TAG provisionada deve poder seguir para fluxo de leitura segura.

## 4. Fluxo B - Acesso por TAG
1. Firmware le TAG e valida estado local.
2. Solicita challenge.
3. Calcula proof e solicita authorize.
4. Se permitido, atualiza estado e confirma commit.

### Aceite
- Em caso permitido, relé acionado.
- Em caso negado, relé inativo e evento de negação.

## 5. Fluxo C - Falhas esperadas
1. Tempo invalido.
2. Estado da TAG inconsistente.
3. Challenge expirado.
4. Falha de rede com relayer.

### Aceite
- O firmware deve falhar de forma segura (sem liberar acesso indevido).

## 6. Bibliografia
- IEC 61508 (conceitos de comportamento fail-safe, referência geral).
- Boas práticas de testes em sistemas embarcados.





