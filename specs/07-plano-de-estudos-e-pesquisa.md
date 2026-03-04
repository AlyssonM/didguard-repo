# 07 - Plano de Estudos e Pesquisa Bibliografica

## 1. Descrição
Trilha de estudos para que o aluno compreenda os fundamentos teoricos e consiga reproduzir o DIDGuard com autonomia.

## 2. Objetivo
- Conectar teoria (identidade, criptografia, blockchain, IoT, IPFS) com prática de implementação.

## 3. Trilha recomendada (4 ciclos)

### Ciclo 1 - Fundamentos de identidade e arquitetura
- Estudar:
  - DID Core (W3C)
  - arquitetura em camadas (C4)
- Resultado esperado:
  - explicar o papel de DID, CID e relayer no projeto.

### Ciclo 2 - Criptografia aplicada ao firmware
- Estudar:
  - SHA-256 e HMAC (RFC 2104)
  - ECDSA secp256k1 (conceitos)
  - anti-replay por nonce/counter
- Resultado esperado:
  - interpretar `compute_tag_counter_mac` e `compute_tag_challenge_proof`.

### Ciclo 3 - Smart contracts e integração
- Estudar:
  - Solidity básico
  - eventos e controle de acesso
  - Hardhat deploy e testes
- Resultado esperado:
  - explicar `hasAccessDebug` e fluxo `setAccess/revoke`.

### Ciclo 4 - Operação distribuida e reprodução
- Estudar:
  - IPFS Kubo e CID
  - Docker Compose e recuperação de estado
  - observabilidade via eventos
- Resultado esperado:
  - executar recreate + resync sem perda funcional.

## 4. Bibliografia principal
- W3C DID Core: https://www.w3.org/TR/did-core/
- RFC 2104 (HMAC): https://www.rfc-editor.org/rfc/rfc2104
- Solidity Docs: https://docs.soliditylang.org/
- Hardhat Docs: https://hardhat.org/docs
- Ethers Docs: https://docs.ethers.org/
- IPFS Docs: https://docs.ipfs.tech/
- ESP-IDF Docs: https://docs.espressif.com/projects/esp-idf/en/latest/
- OWASP IoT Top 10: https://owasp.org/www-project-internet-of-things/

## 5. Bibliografia complementar
- NIST SP 800-63 (identidade digital).
- ISO/IEC 25010 (qualidade de software).
- Sommerville - Software Engineering.






