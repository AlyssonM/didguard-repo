# Laboratório do Capítulo 1 — Resolução de DID `did:web`

## Objetivo de aprendizagem

Ao final deste lab, o leitor será capaz de:

1. Explicar o que é um **DID Document** e qual o papel de cada campo (`verificationMethod`, `authentication`, `service`).
2. Descrever o algoritmo de resolução do método `did:web` — como o identificador é convertido em uma URL HTTP.
3. Publicar e resolver um DID localmente, sem depender de nenhuma rede externa.

> **Conexão com o capítulo:** este lab acompanha a Seção 1.4 ("Rodando na prática") e ilustra concretamente os conceitos da Seção 1.2 (Arquitetura de um DID Document).

## Requisitos

- Node.js 18 ou superior (necessário para `fetch` nativo)

## Arquivos

| Arquivo | Papel |
|---|---|
| `did.json` | DID Document que simula a identidade de "Alice" |
| `server.mjs` | Servidor HTTP que expõe o documento na rota correta conforme a spec `did:web` |
| `resolve.mjs` | Resolvedor simples que converte um DID em URL, baixa o documento e exibe seus campos |

## Execução

**Terminal 1** — suba o servidor:

```bash
node server.mjs
```

Saída esperada:

```
Servidor do laboratorio ouvindo em http://localhost:8081
DID disponivel em did:web:localhost%3A8081:users:alice
```

**Terminal 2** — resolva o DID:

```bash
node resolve.mjs did:web:localhost%3A8081:users:alice
```

Saída esperada:

```
Resolvendo: did:web:localhost%3A8081:users:alice
URL derivado: http://localhost:8081/users/alice/did.json

Campos principais do DID Document:
- id: did:web:localhost%3A8081:users:alice
- verificationMethod: 1
- authentication: 1
- assertionMethod: 1
- service: 1

{
  "@context": [ ... ],
  "id": "did:web:localhost%3A8081:users:alice",
  ...
}
```

## Como funciona a conversão DID → URL

O método `did:web` usa um algoritmo simples descrito na [spec DID Web](https://w3c-ccg.github.io/did-method-web/):

```
did:web:localhost%3A8081:users:alice
       ├─ host ─────────┤├ path ──┤

1. Decodifica o host:  localhost%3A8081 → localhost:8081
2. Separa as partes do path:  users : alice → /users/alice
3. Adiciona /did.json ao final
4. Resultado: http://localhost:8081/users/alice/did.json
```

## Exercícios propostos

1. **Crie um segundo DID para Bob:** adicione um `bob-did.json`, registre uma nova rota no `server.mjs` e resolva-o com `resolve.mjs`.
2. **Adicione um segundo `verificationMethod`:** inclua uma chave Ed25519 no DID Document e observe como os contadores mudam na saída.
3. **Quebre propositalmente o documento:** remova o campo `id` do JSON e veja qual erro o resolvedor mostra. O que isso revela sobre validação?

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| `fetch failed` no resolvedor | Servidor não está rodando | Verifique se o Terminal 1 está ativo |
| `TypeError: fetch is not a function` | Node.js < 18 | Atualize para Node.js 18+ |
| Porta 8081 já em uso | Outro processo usando a porta | Encerre o processo ou mude a porta no `server.mjs` |
