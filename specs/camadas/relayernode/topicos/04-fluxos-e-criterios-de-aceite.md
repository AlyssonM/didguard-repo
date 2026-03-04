# RelayerNode - Fluxos e Critérios de Aceite

## 1. Descrição
Define os fluxos principais da camada relayer e como aprovar sua reprodução.

## 2. Objetivo
- Permitir validação fim-a-fim da API em laboratório.

## 3. Fluxo A - Provisionamento
1. Início da janela.
2. Recebimento do documento.
3. Publicação no IPFS.
4. Registro de CID na cadeia.
5. Encerramento da janela.

### Aceite
- DID com CID consultavel e evento de provisionamento registrado.

## 4. Fluxo B - Acesso por TAG
1. Emissao de challenge.
2. Recepcao de proof.
3. Consulta de autorização no contrato.
4. Commit de sessão.

### Aceite
- Evento de autorização/negação coerente com a política vigente.

## 5. Fluxo C - Acesso por biometria
1. Recepcao de embedding.
2. Resolucao de DID/UID.
3. Consulta de acesso no contrato.

### Aceite
- Resposta com `allowed`, `tagDid` e `tagUid` para casos reconhecidos.

## 6. Fluxo D - Resync
1. Leitura de estado auxiliar.
2. Reaplicacao de estado na cadeia.
3. Verificação por consultas.

### Aceite
- Estado funcional equivalente ao pre-recreate.

## 7. Bibliografia
- REST maturity model.
- Event-driven logging patterns.






