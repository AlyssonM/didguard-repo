# Laboratorios Autocontidos da Apostila

Este diretorio reune mini-projetos independentes usados nas secoes **"Rodando na pratica"** de cada capitulo. Cada laboratorio isola um conceito central para que o leitor possa experimentar sem precisar montar o sistema completo do DIDGuard.

## Principio didatico

Os labs seguem a estrutura **Conceito -> Codigo -> Observacao -> Reflexao**:

1. O README de cada lab explica **o que** sera feito e **por que** isso importa.
2. O codigo e ricamente comentado para guiar a leitura linha a linha.
3. A secao *Saida esperada* mostra exatamente o que o terminal deve exibir.
4. Os *Exercicios propostos* convidam o leitor a estender o exemplo sozinho.

## Pre-requisitos gerais

| Ferramenta | Versao minima | Labs que usam |
|---|---|---|
| Node.js | 18+ | Caps 1, 2, 3 e 4 |
| npm | 9+ | Cap 4 |
| Hardhat (via npx) | - | Cap 4 |
| PlatformIO | 6+ | Cap 5 |

## Estrutura

| Diretorio | Capitulo | Conceito central |
|---|---|---|
| `cap1-did-resolution/` | 1 - Identificadores Descentralizados | Resolucao local de um DID Document `did:web` por HTTP |
| `cap2-rfid-mifare/` | 2 - RFID e MIFARE Classic | Simulador de memoria, setores, trailer e autenticacao |
| `cap3-crypto-aplicada/` | 3 - Criptografia Aplicada | Hash, HMAC, AES-GCM e assinatura ECDSA |
| `cap4-blockchain-contratos/` | 4 - Blockchain e Contratos Inteligentes | Contrato de controle de acesso em Hardhat |
| `cap5-firmware-esp32/` | 5 - ESP32, ESP-IDF e PlatformIO | Projeto minimo de firmware com Wi-Fi, SPI/RC522 e geracao de DID |

## Convencoes

- Os labs em JavaScript usam **ES Modules** (`.mjs`) - exceto os scripts Hardhat que usam CommonJS por exigencia do framework.
- Mensagens de console estao em **portugues** para alinhar com o texto da apostila.
- Nenhum lab depende de dependencias externas alem do que esta declarado no proprio diretorio.
