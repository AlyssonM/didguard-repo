# Laboratório do Capítulo 2 — Simulador MIFARE Classic

## Objetivo de aprendizagem

Ao final deste lab, o leitor será capaz de:

1. Descrever a **organização lógica** de uma tag MIFARE Classic: setores, blocos e setor trailer.
2. Explicar o papel dos campos **Key A**, **bits de acesso** e **Key B** no setor trailer.
3. Demonstrar por que a leitura/escrita exige **autenticação prévia** do setor.
4. Reconhecer as **limitações de segurança** das chaves estáticas da MIFARE Classic.

> **Conexão com o capítulo:** este lab acompanha a Seção 2.5 ("Rodando na prática") e materializa os conceitos das Seções 2.2 (Organização de memória) e 2.3 (Autenticação e bits de acesso).

## Requisitos

- Node.js 18 ou superior

## Arquivos

| Arquivo | Papel |
|---|---|
| `mifare-sim.mjs` | Simulador principal — cria uma tag virtual com 2 setores e executa operações de leitura, autenticação e escrita |

## Execução

```bash
node mifare-sim.mjs
```

## Saída esperada

```
=== Tag simulada MIFARE Classic ===
UID: DE AD BE EF
Setores simulados: 2
Blocos por setor: 4 (3 de dados + 1 trailer)
Tamanho de cada bloco: 16 bytes

--- Passo 1: Leitura sem autenticacao ---
Tentando ler bloco 0 do setor 1 sem autenticar...
 ✗ Leitura negada: setor ainda nao autenticado.

--- Passo 2: Autenticacao ---
Autenticando setor 1 com Key A padrao (FFFFFFFFFFFF)...
 ✓ Autenticacao: sucesso

--- Passo 3: Escrita de dados ---
Escrevendo "did:example:1234" no bloco 0 do setor 1...
 ✓ Bloco 0 (ASCII): did:example:1234
 ✓ Bloco 0 (hex):   6469643a6578616d706c653a31323334

--- Passo 4: Inspecao do setor trailer ---
Lendo o trailer (bloco 3) do setor 1...
 • Key A (6 bytes):        ffffffffffff
 • Bits de acesso (4 bytes): ff078069
 • Key B (6 bytes):        a0a1a2a3a4a5

--- Analise ---
 • A protecao nativa depende de chaves estaticas de 6 bytes — vulneravel a ataques de replay e forca bruta.
 • A chave padrao FFFFFFFFFFFF e publica — nunca use em producao.
 • O DIDGuard mitiga isso adicionando HMAC, contador monotônico e desafio-resposta sobre o canal RFID.
```

## Anatomia de um setor MIFARE Classic

```
Setor (4 blocos × 16 bytes = 64 bytes)
┌──────────────────────────────────────────────┐
│ Bloco 0: dados do usuario (16 bytes)         │
│ Bloco 1: dados do usuario (16 bytes)         │
│ Bloco 2: dados do usuario (16 bytes)         │
│ Bloco 3: SECTOR TRAILER                      │
│   ├─ Key A (6 bytes)                         │
│   ├─ Bits de acesso (4 bytes)                │
│   └─ Key B (6 bytes)                         │
└──────────────────────────────────────────────┘
```

## Exercícios propostos

1. **Autenticação com Key B:** modifique `authenticate()` para também aceitar Key B (bytes 10–15 do trailer). Teste com `"A0A1A2A3A4A5"`.
2. **Proteção contra escrita no trailer:** tente escrever no bloco 3 e observe a exceção. Por que o lab impede essa operação?
3. **Adicione um terceiro setor:** expanda `tag.sectors` para 3 e grave dados nos blocos de cada setor.
4. **Simule uma chave errada:** passe `"000000000000"` para `authenticate()` e observe que a operação falha — isso é equivalente a um ataque com chave incorreta.

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| `RangeError: offset is out of range` | Texto maior que 16 bytes em `writeBlock` | Limite o texto a 16 caracteres ASCII |
| Bloco sempre zerado após escrita | Esqueceu de autenticar antes de escrever | Chame `authenticate()` primeiro |
