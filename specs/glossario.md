# Glossário - DIDGuard

## 1. Objetivo
Padronizar os termos técnicos usados nas especificações, implementação e validação do DIDGuard.

## 2. Termos de identidade e credenciais
- DID (Decentralized Identifier): identificador descentralizado do padrão W3C para representar entidades digitais.
- DID Document: documento JSON associado a um DID, com metadados e métodos de verificação.
- Verifiable Credential (VC): credencial verificável assinada criptograficamente.
- Verifiable Presentation (VP): apresentação de uma ou mais credenciais para verificação.
- KYC (Know Your Customer): conjunto de dados de identificação do usuário (nome, matrícula/SIAPE, etc.).
- Tag DID: DID associado a uma TAG NFC no projeto.

## 3. Termos de criptografia e segurança
- ECC (Elliptic Curve Cryptography): criptografia de curva elíptica para assinaturas e chaves compactas.
- ECDSA secp256k1: algoritmo/curva usados para assinatura digital no projeto.
- Chave pública: chave compartilhável usada para verificar assinaturas.
- Chave privada: chave secreta usada para assinar dados.
- Assinatura digital: prova criptográfica de autoria e integridade.
- SHA-256: função hash criptográfica usada para integridade e derivação.
- HMAC: código de autenticação de mensagem com chave simétrica.
- Nonce: valor único e temporário para evitar replay.
- Replay attack: reutilização maliciosa de mensagem válida anteriormente capturada.
- Challenge-response: protocolo em que um desafio é emitido e uma prova válida deve ser retornada.
- Counter (contador): valor monotônico para detectar repetição e sincronizar sessões de TAG.
- AES-256-GCM: modo de criptografia autenticada usado para proteger embedding biométrico.

## 4. Termos de biometria
- Embedding biométrico: vetor numérico que representa características faciais extraídas por modelo de IA.
- Similaridade/distância: métrica para comparar embeddings e decidir correspondência.
- Threshold (limiar): valor de corte para aceitar ou rejeitar uma correspondência biométrica.
- Falso positivo: sistema aceita indevidamente um usuário não autorizado.
- Falso negativo: sistema rejeita indevidamente um usuário autorizado.

## 5. Termos de blockchain e contratos
- Smart Contract: programa executado na blockchain com regras de negócio imutáveis após deploy.
- EVM (Ethereum Virtual Machine): ambiente de execução dos contratos Ethereum.
- Transação (tx): operação enviada para alterar estado on-chain.
- Tx hash: identificador único da transação na rede.
- Block timestamp: horário do bloco usado para validar expiração no contrato.
- Rede local Hardhat: blockchain local usada para testes e desenvolvimento.
- ABI (Application Binary Interface): interface usada para chamada de funções do contrato.
- Event (evento on-chain): registro emitido pelo contrato para auditoria e integração.

## 6. Termos de IPFS
- IPFS (InterPlanetary File System): sistema distribuído de armazenamento endereçado por conteúdo.
- CID (Content Identifier): identificador derivado do conteúdo; muda quando o conteúdo muda.
- Pin: marcação para manter conteúdo armazenado localmente no nó.
- Pin rm: remoção da marca de pin de um CID.
- Repo gc (garbage collection): limpeza local de blocos não referenciados no repositório IPFS.
- Kubo: implementação oficial do nó IPFS utilizada no projeto.
- Gateway IPFS: serviço HTTP para leitura de conteúdo IPFS.

## 7. Termos de firmware e hardware
- ESP32: microcontrolador principal do dispositivo de borda.
- RC522 (MFRC522): leitor/escritor NFC usado para interação com TAGs.
- NFC (Near Field Communication): tecnologia de comunicação de curto alcance para TAG/cartão.
- UID (Unique Identifier): identificador da TAG NFC lido pelo RC522.
- Relay (relé): atuador físico para liberar ou negar acesso.
- NVS (Non-Volatile Storage): armazenamento persistente interno do ESP32.
- NTP (Network Time Protocol): protocolo de sincronização de tempo.

## 8. Termos de backend, frontend e operação
- RelayerNode: serviço backend que integra firmware, IPFS e blockchain.
- Endpoint: rota de API exposta por serviço HTTP.
- CORS: política de compartilhamento de recursos entre origens diferentes.
- Dashboard: interface administrativa para operação e monitoramento.
- Timeline de segurança: histórico de eventos de autorização e negação.
- Resync: procedimento para reconstruir estado on-chain a partir do estado local.
- Recreate (container): remoção e recriação de container (normalmente com perda de estado interno não persistido).
- Docker Compose: orquestração local de múltiplos containers do projeto.

## 9. Termos de engenharia de software
- Requisito funcional (RF): comportamento que o sistema deve executar.
- Requisito não funcional (RNF): restrições de qualidade, desempenho, segurança e operação.
- Critério de aceite: condição objetiva para considerar uma entrega validada.
- Rastreabilidade: vínculo entre requisito, implementação e evidência de teste.
- Evidência: registro verificável de que um comportamento foi validado (log, teste, print, vídeo, resposta de API).
