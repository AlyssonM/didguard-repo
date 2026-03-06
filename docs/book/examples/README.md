# Laboratórios Autocontidos da Apostila

Este diretório reúne mini-projetos independentes usados nas seções **"Rodando na prática"** de cada capítulo. Cada laboratório isola um conceito central para que o leitor possa experimentar sem precisar montar o sistema completo do DIDGuard.

## Princípio didático

Os labs seguem a estrutura **Conceito → Código → Observação → Reflexão**:

1. O README de cada lab explica **o que** será feito e **por que** isso importa.
2. O código é ricamente comentado para guiar a leitura linha a linha.
3. A seção *Saída esperada* mostra exatamente o que o terminal deve exibir.
4. Os *Exercícios propostos* convidam o leitor a estender o exemplo sozinho.

## Pré-requisitos gerais

| Ferramenta | Versão mínima | Labs que usam |
|---|---|---|
| Node.js | 18+ | Todos |
| npm | 9+ | Cap 4 |
| Hardhat (via npx) | — | Cap 4 |

## Estrutura

| Diretório | Capítulo | Conceito central |
|---|---|---|
| `cap1-did-resolution/` | 1 — Identificadores Descentralizados | Resolução local de um DID Document `did:web` por HTTP |
| `cap2-rfid-mifare/` | 2 — RFID e MIFARE Classic | Simulador de memória, setores, trailer e autenticação |
| `cap3-crypto-aplicada/` | 3 — Criptografia Aplicada | Hash, HMAC, AES-GCM e assinatura ECDSA |
| `cap4-blockchain-contratos/` | 4 — Blockchain e Contratos Inteligentes | Contrato de controle de acesso em Hardhat |

## Convenções

- Todos os scripts usam **ES Modules** (`.mjs`) — exceto os scripts Hardhat que usam CommonJS por exigência do framework.
- Mensagens de console estão em **português** para alinhar com o texto da apostila.
- Nenhum lab depende de dependências externas além do que está declarado no próprio diretório.
