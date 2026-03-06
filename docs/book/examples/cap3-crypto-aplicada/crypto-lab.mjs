/**
 * crypto-lab.mjs — Laboratório prático de criptografia aplicada.
 *
 * Este script demonstra as quatro primitivas criptográficas fundamentais
 * usadas no DIDGuard, todas com a API nativa `node:crypto` (sem dependências):
 *
 *   1) SHA-256    — hash para integridade
 *   2) HMAC-256   — autenticação com segredo compartilhado
 *   3) AES-256-GCM — cifragem autenticada (confidencialidade + integridade)
 *   4) ECDSA P-256 — assinatura digital (autenticidade + não-repúdio)
 *
 * Cada bloco imprime explicações no terminal para que o leitor
 * entenda o "porquê" de cada operação, não apenas o "como".
 */

import {
  createHash,
  createHmac,
  createCipheriv,
  createDecipheriv,
  generateKeyPairSync,
  randomBytes,
  sign,
  verify,
} from "node:crypto";

// ══════════════════════════════════════════════════════════════
// Dados de entrada compartilhados entre os blocos
// ══════════════════════════════════════════════════════════════

/** Mensagem de exemplo — simula um payload de controle de acesso. */
const message = "controle-de-acesso";

/**
 * Chave HMAC de 32 bytes (256 bits).
 * Em produção, esta chave seria derivada via HKDF ou lida de um HSM.
 * Aqui é hardcoded para reprodutibilidade do lab.
 */
const hmacKey = Buffer.from(
  "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
  "hex"
);

// ══════════════════════════════════════════════════════════════
// Cabeçalho
// ══════════════════════════════════════════════════════════════

console.log("\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557");
console.log("\u2551   Laboratorio de Criptografia Aplicada   \u2551");
console.log("\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d");

// ══════════════════════════════════════════════════════════════
// 1) Hash SHA-256
// ══════════════════════════════════════════════════════════════
//
// O hash é uma função unidirecional: dada uma entrada de qualquer tamanho,
// produz uma saída fixa de 256 bits (32 bytes, 64 caracteres hex).
//
// Propriedades importantes:
//   - Determinístico: mesma entrada → mesmo digest, sempre
//   - Efeito avalanche: 1 bit diferente na entrada → ~50% dos bits mudam
//   - Resistente a colisão: é inviável encontrar duas entradas com mesmo digest
//   - Irreversível: não se pode recuperar a entrada a partir do digest

console.log("");
console.log("\u2501\u2501\u2501 1) Hash SHA-256 \u2501\u2501\u2501");
const digest = createHash("sha256").update(message).digest("hex");
console.log(`Entrada:  ${message}`);
console.log(`Digest:   ${digest}`);
console.log(`\u2192 O hash e deterministico: a mesma entrada sempre gera o mesmo digest.`);
console.log(`\u2192 É computacionalmente inviavel reverter o digest para a entrada original.`);

// ══════════════════════════════════════════════════════════════
// 2) HMAC-SHA-256
// ══════════════════════════════════════════════════════════════
//
// HMAC (Hash-based Message Authentication Code) combina um hash com
// uma chave secreta. Isso garante:
//   - Integridade: a mensagem não foi alterada
//   - Autenticidade: quem gerou o MAC conhece a chave
//
// Diferente do hash puro, que qualquer um pode calcular, o HMAC
// exige posse do segredo compartilhado.
//
// No DIDGuard, o HMAC é usado para autenticar quadros RFID entre
// a tag e o firmware do ESP32.

console.log("");
console.log("\u2501\u2501\u2501 2) HMAC-SHA-256 \u2501\u2501\u2501");
const mac = createHmac("sha256", hmacKey).update(message).digest("hex");
console.log(`Chave:    ${hmacKey.toString("hex").slice(0, 16)}... (32 bytes = 256 bits)`);
console.log(`HMAC:     ${mac}`);
console.log(`\u2192 Diferente do hash puro, o HMAC precisa de segredo compartilhado.`);
console.log(`\u2192 Quem nao conhece a chave nao consegue gerar nem verificar o MAC.`);

// ══════════════════════════════════════════════════════════════
// 3) AES-256-GCM (cifragem autenticada)
// ══════════════════════════════════════════════════════════════
//
// AES-GCM combina cifragem (AES no modo contador) com autenticação
// (GMAC). É um modo AEAD — Authenticated Encryption with Associated Data.
//
// Componentes:
//   - Chave: 32 bytes (256 bits) — segredo simétrico
//   - IV (Initialization Vector): 12 bytes (96 bits) — DEVE ser único por operação
//   - Ciphertext: dados cifrados
//   - Auth Tag: 16 bytes (128 bits) — prova de integridade e autenticidade
//
// ATENÇÃO: reutilizar o IV com a mesma chave compromete toda a segurança.
// No DIDGuard, o IV é derivado de um contador monotônico.

console.log("");
console.log("\u2501\u2501\u2501 3) AES-256-GCM (cifragem autenticada) \u2501\u2501\u2501");

// Gera chave e IV aleatórios para este lab
const aesKey = randomBytes(32); // 256 bits
const iv = randomBytes(12); // 96 bits — tamanho recomendado para GCM

// Cifra a mensagem
const plainInput = "embedding-biometrico";
const cipher = createCipheriv("aes-256-gcm", aesKey, iv);
const ciphertext = Buffer.concat([
  cipher.update(plainInput, "utf8"),
  cipher.final(),
]);
const authTag = cipher.getAuthTag(); // Tag de autenticação (16 bytes)

console.log(`Plaintext:  ${plainInput}`);
console.log(`IV:         ${iv.toString("hex")} (12 bytes = 96 bits)`);
console.log(`Ciphertext: ${ciphertext.toString("hex")}`);
console.log(`Auth Tag:   ${authTag.toString("hex")} (16 bytes = 128 bits)`);

// Decifra a mensagem — precisa da mesma chave, IV e authTag
const decipher = createDecipheriv("aes-256-gcm", aesKey, iv);
decipher.setAuthTag(authTag);
const plaintext = Buffer.concat([
  decipher.update(ciphertext),
  decipher.final(),
]).toString("utf8");

console.log(`Decifrado:  ${plaintext} \u2713`);
console.log(`\u2192 O IV deve ser unico para cada operacao \u2014 reusar IV quebra a seguranca.`);
console.log(`\u2192 O authTag garante que o ciphertext nao foi adulterado (integridade + autenticidade).`);

// ══════════════════════════════════════════════════════════════
// 4) ECDSA em curva P-256
// ══════════════════════════════════════════════════════════════
//
// ECDSA (Elliptic Curve Digital Signature Algorithm) é um algoritmo
// de assinatura digital baseado em curvas elípticas.
//
// Diferente do HMAC (simétrico), o ECDSA é assimétrico:
//   - A chave PRIVADA assina (só o dono possui)
//   - A chave PÚBLICA verifica (qualquer um pode ter)
//
// Isso permite não-repúdio: o assinante não pode negar ter assinado.
//
// No DIDGuard, o par de chaves ECDSA P-256 é armazenado no
// DID Document (chave pública) e no ESP32 (chave privada).
// Isso é exatamente o que aparece no campo verificationMethod
// do DID Document do Capítulo 1.

console.log("");
console.log("\u2501\u2501\u2501 4) ECDSA em curva P-256 \u2501\u2501\u2501");

// Gera um par de chaves efêmero para demonstração
// prime256v1 é o nome OpenSSL para a curva NIST P-256 (secp256r1)
const { privateKey, publicKey } = generateKeyPairSync("ec", {
  namedCurve: "prime256v1",
});

// Assina a mensagem original com a chave privada
const signature = sign("sha256", Buffer.from(message), privateKey);

// Verifica com a chave pública — deve retornar true
const valid = verify("sha256", Buffer.from(message), publicKey, signature);

// Verifica com uma mensagem alterada — deve retornar false
const invalid = verify(
  "sha256",
  Buffer.from(`${message}-alterado`),
  publicKey,
  signature
);

console.log(`Mensagem original \u2014 assinatura valida: ${valid} \u2713`);
console.log(`Mensagem alterada \u2014 assinatura valida: ${invalid} \u2717`);
console.log(`\u2192 Qualquer pessoa com a chave publica pode verificar, mas so o dono da privada pode assinar.`);
console.log(`\u2192 E isso que torna a assinatura digital util para identidade descentralizada (DIDs).`);
