# IPFS - Fluxos e Critérios de Aceite

## 1. Descrição
Fluxos essenciais da camada IPFS para reprodução do DIDGuard.

## 2. Objetivo
- Estabelecer rotina de validação da camada durante o projeto.

## 3. Fluxo A - Publicação
1. Receber documento serializado.
2. Armazenar objeto.
3. Retornar CID.

### Aceite
- CID retorna sem erro e e persistido para uso posterior.

## 4. Fluxo B - Recuperação
1. Receber CID.
2. Recuperar documento.
3. Entregar conteúdo para validação de identidade/acesso.

### Aceite
- Documento recuperado corresponde ao esperado para o DID.

## 5. Fluxo C - Reinicio de ambiente
1. Reiniciar container IPFS.
2. Consultar CID previamente conhecido.

### Aceite
- Conteúdo continua acessivel após reinicio.

## 6. Bibliografia
- Kubo operations guide.
- Content addressing fundamentals.





