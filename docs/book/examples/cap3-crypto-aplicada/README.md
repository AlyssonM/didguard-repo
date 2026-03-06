# Laboratório do Capítulo 3 — Criptografia Aplicada

## Objetivo de aprendizagem

Ao final deste lab, o leitor será capaz de:

1. Distinguir **hash**, **HMAC**, **cifragem autenticada** e **assinatura digital** — e saber quando usar cada um.
2. Aplicar **SHA-256** para gerar um digest de integridade.
3. Usar **HMAC-SHA-256** para autenticar uma mensagem com segredo compartilhado.
4. Cifrar e decifrar dados com **AES-256-GCM**, entendendo o papel do IV e do authTag.
5. Assinar e verificar uma mensagem com **ECDSA P-256**, entendendo chave pública × privada.

> **Conexão com o capítulo:** este lab acompanha a Seção 3.6 ("Rodando na prática") e demonstra as quatro primitivas discutidas nas Seções 3.2 a 3.5.

> **Conexão com o DIDGuard:** o firmware do ESP32 usa exatamente estas primitivas — SHA-256 para fingerprint do UID, HMAC para autenticar quadros RFID, AES-GCM para proteger dados em trânsito, e ECDSA para assinar desafios no protocolo de handshake.

## Requisitos

- Node.js 18 ou superior (usa a API `node:crypto` nativa — sem dependências externas)

## Arquivos

| Arquivo | Papel |
|---|---|
| `crypto-lab.mjs` | Script único que executa sequencialmente os 4 blocos criptográficos |

## Execução

```bash
node crypto-lab.mjs
```

## Saída esperada

> **Nota:** valores de hex variam a cada execução (exceto o hash SHA-256, que é determinístico).

```
╔══════════════════════════════════════════╗
║   Laboratorio de Criptografia Aplicada   ║
╚══════════════════════════════════════════╝

━━━ 1) Hash SHA-256 ━━━
Entrada:  controle-de-acesso
Digest:   e3b7c8... (64 caracteres hex = 256 bits)
→ O hash e deterministico: a mesma entrada sempre gera o mesmo digest.
→ É computacionalmente inviável reverter o digest para a entrada original.

━━━ 2) HMAC-SHA-256 ━━━
Chave:    00112233... (32 bytes = 256 bits)
HMAC:     a1f2c3... (64 caracteres hex)
→ Diferente do hash puro, o HMAC precisa de segredo compartilhado.
→ Quem nao conhece a chave nao consegue gerar nem verificar o MAC.

━━━ 3) AES-256-GCM (cifragem autenticada) ━━━
Plaintext:  embedding-biometrico
IV:         ... (12 bytes = 96 bits)
Ciphertext: ... (hex)
Auth Tag:   ... (16 bytes = 128 bits)
Decifrado:  embedding-biometrico ✓
→ O IV deve ser unico para cada operacao — reusar IV quebra a segurança.
→ O authTag garante que o ciphertext nao foi adulterado (integridade + autenticidade).

━━━ 4) ECDSA em curva P-256 ━━━
Mensagem original — assinatura valida: true ✓
Mensagem alterada — assinatura valida: false ✗
→ Qualquer pessoa com a chave publica pode verificar, mas só o dono da privada pode assinar.
→ É isso que torna a assinatura digital util para identidade descentralizada (DIDs).
```

## Mapa conceitual

```
              ┌─────────────────────────────┐
              │   Quatro primitivas          │
              └─────────────┬───────────────┘
     ┌──────────────┬───────┴───────┬──────────────┐
     ▼              ▼               ▼              ▼
  SHA-256        HMAC-256       AES-256-GCM     ECDSA P-256
  (hash)      (autenticação)   (cifragem)     (assinatura)
     │              │               │              │
  Integridade   Integridade     Confidencia-   Autenticidade
                + Autenticid.   lidade +       + Não-repúdio
                  (simétrica)   Integridade      (assimétrica)
```

## Exercícios propostos

1. **Hash avalanche:** altere um único caractere da mensagem (`"controle-de-Acesso"`) e compare os digests. Quantos caracteres mudam?
2. **HMAC com chave errada:** altere 1 byte da `hmacKey` e verifique se o MAC muda completamente — demonstre o princípio de segurança.
3. **Reutilização de IV:** cifre duas mensagens diferentes com o **mesmo IV** e observe que os ciphertexts são diferentes mas a segurança está comprometida (pesquise "nonce reuse attack").
4. **Verificação cruzada:** exporte a chave pública em formato PEM e use o OpenSSL para verificar a assinatura gerada pelo script.

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| `Error: unsupported algorithm` | Node.js muito antigo | Atualize para Node.js 18+ |
| Digest muda a cada execução | Você está olhando o HMAC/AES, não o hash | O SHA-256 é determinístico; HMAC e AES usam chaves/IVs que podem variar |
