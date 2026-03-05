# 02 - Requisitos Funcionais (RF)

## 1. Descrição
Catalogo de requisitos funcionais do DIDGuard para a versão de referência do projeto.

## 2. Objetivo
- Formalizar comportamento esperado do sistema por requisito identificavel.
- Permitir validação objetiva por critério de aceite.

## 3. Requisitos

### RF-001 - Início remoto de provisionamento
O sistema deve permitir iniciar uma janela temporaria de provisionamento via API do relayer.
- Aceite: `POST /api/provisioning/start` retorna `active=true` com `expiresAt`.

### RF-002 - Modo write automático no ESP32
Durante janela ativa, o ESP32 deve entrar em modo write automaticamente ao detectar TAG.
- Aceite: log do ESP32 indica provisionamento ativo e tentativa de `write_tag`.

### RF-003 - Encerramento automático da janela
Após provisionamento bem sucedido, o ESP32 deve solicitar encerramento da janela no relayer.
- Aceite: `POST /api/provisioning/finish` retorna `active=false`.

### RF-004 - Registro de DID Document no IPFS
O relayer deve publicar DID Document no contrato (ou IPFS e obter CID a ser registrado no contrato).
- Aceite: resposta de upload contem `didDocument` válido (opcionalmente `cid` válido).

### RF-005 - Registro on-chain de DID
O relayer deve registrar prova no contrato por `registerTagDID` (e CID opcionalmente).
- Aceite: `POST /api/registerTagDID` retorna tx hash e leitura posterior indica DID registrado.
- Aceite (opcional, se IPFS): `GET /api/getDidCid?tagDid=...` retorna CID não vazio.

### RF-006 - Registro de credencial de TAG
O sistema deve registrar credencial (`uid`, `issued`, `expiration`, `tagType`) no contrato.
- Aceite: `GET /api/getTagCredentials?tagDid=...` lista credencial.

### RF-007 - Concessão de acesso por dispositivo
Administrador deve definir acesso com expiração por `setAccess`.
- Aceite: API retorna hash de transação e leitura posterior indica permitido.

### RF-008 - Revogação de credencial
Administrador deve revogar TAG associada ao usuário.
- Aceite: `POST /api/revokeCredential` retorna tx hash e acesso subsequente e negado.

### RF-009 - Controle de acesso por TAG com challenge-response
ESP32 deve validar challenge, enviar proof e confirmar commit de sessão.
- Aceite: eventos `authorized`/`denied` sao gerados em `/api/security/events`.

### RF-010 - Controle de acesso por biometria (opcional)
Sistema deve recuperar DID/UID por embedding facial e consultar contrato para autorização.
- Aceite: `POST /api/security/biometricAccessCheck` retorna `allowed` + `tagDid` + `tagUid`.

### RF-011 - Login biométrico (opcional)
Frontend deve permitir login por biometria consultando relayer.
- Aceite: rota de login retorna DID associado quando embedding e reconhecido.

### RF-012 - Cadastro de dispositivos
Administrador deve cadastrar e listar dispositivos.
- Aceite: `POST /api/devices` seguido de `GET /api/devices` inclui item novo.

### RF-013 - Busca de registro DID/KYC
Frontend deve consultar usuários por DID/nome/registro.
- Aceite: `GET /api/didRegistrySearch?query=...` retorna resultados filtrados.

### RF-014 - Timeline de segurança
Dashboard deve exibir eventos enriquecidos com usuário/dispositivo.
- Aceite: `GET /api/security/events` retorna lista com campos de contexto.

## 4. Bibliografia
- IEEE 29148 (requisitos).
- REST API Design Guidelines (Microsoft).
- W3C DID Core para semantica de identidade.





