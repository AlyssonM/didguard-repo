# 01 - Especificação do Sistema DIDGuard

## 1. Descrição
Especificação de alto nivel do DIDGuard, incluindo finalidade, atores e escopo funcional da versão de referência do projeto.

## 2. Objetivo
- Definir claramente o que o sistema faz hoje.
- Delimitar o que esta dentro e fora do escopo de reprodução.

## 3. Problema que o sistema resolve
Controlar acesso físico com TAG NFC (biometria facial opcional) usando identidade descentralizada (DID), integridade criptografica e trilha auditavel.

## 4. Atores
- `Administrador`: configura dispositivos, concede/revoga acesso e monitora eventos.
- `Usuário final`: possui TAG/DID com biometria integrada opcionalmente.
- `ESP32 leitor`: executa fluxo local de leitura/escrita e challenge-response.
- `Relayer`: integra ESP32, IPFS e blockchain.
- `Blockchain local`: armazena políticas e mapeamento DID->CID.
- `IPFS`: armazena DID Documents completos (opcional).

## 5. Escopo funcional (referência)
- Provisionamento de TAG:
  - frontend inicia janela de provisionamento no relayer
  - ESP32 detecta janela e entra em modo write automaticamente
  - após sucesso, ESP32 encerra a janela e volta ao modo read
- Registro de DID Document no contrato (opcionalmente no IPFS e CID no contrato).
- Controle de acesso por `deviceId + tagDid + tagUid` com expiração.
- Fluxo de segurança challenge-response com contador e MAC por TAG.
- Validação de acesso por biometria com recuperação de DID/UID (opcional).
- Revogação de credencial de TAG.
- Monitoramento de eventos em tempo real.

## 6. Fora de escopo
- Wallet Web3 do usuário final.
- Redes Blockchain públicas e custos de gas em producao.
- IAM (Identity and Access Management) corporativo completo (SSO, OIDC, etc.).

## 7. Critério de sucesso da reprodução
Ambiente local funcional com:
1. cadastro/provisionamento bem sucedido,
2. acesso por TAG validado,
3. acesso por biometria validado (opcional),
4. revogação e negação observáveis na timeline,

## 8. Bibliografia
- W3C DID Core. https://www.w3.org/TR/did-core/
- NIST Digital Identity Guidelines (SP 800-63).
- Hardhat e Ethers docs para infraestrutura blockchain local.






