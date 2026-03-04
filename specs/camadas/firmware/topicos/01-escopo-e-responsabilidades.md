# Firmware - Escopo e Responsabilidades

## 1. Descrição
Especifica o que a camada firmware deve fazer, quando deve fazer e quais limites não devem ser ultrapassados.

## 2. Objetivo
- Delimitar responsabilidades da borda no sistema DIDGuard.
- Evitar sobreposicao de lógica entre firmware e relayer.

## 3. Escopo funcional da camada
1. Detectar TAG NFC e identificar seu UID.
2. Executar modo write durante janela de provisionamento ativa.
3. Executar modo read como padrão operacional.
4. Calcular e validar MAC/counter no estado local da TAG.
5. Participar do protocolo challenge-response com o relayer.
6. Acionar o relé físico apenas em autorização valida.

## 4. Fora de escopo da camada
1. Decisão administrativa de permissão por usuário.
2. Persistência de DID document completo.
3. Gestao de políticas de acesso multiusuario.
4. Interface grafica para operador.

## 5. Regras de fronteira
1. O firmware não grava políticas de acesso; apenas solicita validação.
2. O firmware não decide por biometria; apenas participa da trilha TAG.
3. A verdade de autorização final vem do contrato via relayer.

## 6. Bibliografia
- ESP-IDF Programming Guide.
- RFC 2104 (HMAC).
- Material técnico sobre MIFARE Classic.





