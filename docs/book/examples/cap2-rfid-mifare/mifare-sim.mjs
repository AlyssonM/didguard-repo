/**
 * mifare-sim.mjs — Simulador didático de uma tag MIFARE Classic 1K.
 *
 * Este script reproduz em software a organização lógica de memória
 * de uma MIFARE Classic, incluindo:
 *   - Setores com 4 blocos de 16 bytes cada
 *   - Setor trailer (bloco 3 de cada setor) com Key A, bits de acesso e Key B
 *   - Autenticação obrigatória antes de leitura/escrita
 *
 * O objetivo é que o leitor entenda a estrutura de dados antes
 * de trabalhar com hardware real (RC522 + ESP32).
 *
 * Referência: NXP MF1S50YYX_V1 — MIFARE Classic EV1 1K datasheet
 */

// === Constantes da MIFARE Classic ===

/** Cada bloco tem exatamente 16 bytes — isso é fixo no hardware. */
const BLOCK_SIZE = 16;

/** Cada setor contém 4 blocos: 3 de dados + 1 trailer. */
const BLOCKS_PER_SECTOR = 4;

/**
 * Key A padrão de fábrica. Em tags novas, todos os setores usam FFFFFFFFFFFF.
 * ATENÇÃO: esta chave é pública e conhecida — nunca use em produção.
 */
const KEY_A = Buffer.from("FFFFFFFFFFFF", "hex");

/**
 * Key B — segunda chave de acesso. Pode ter permissões diferentes
 * da Key A dependendo da configuração dos bits de acesso.
 */
const KEY_B = Buffer.from("A0A1A2A3A4A5", "hex");

/**
 * Bits de acesso padrão (4 bytes). Controlam quais operações (leitura,
 * escrita, incremento, decremento) são permitidas com Key A e/ou Key B.
 * O valor FF 07 80 69 é o padrão de fábrica para MIFARE Classic.
 */
const ACCESS_BITS = Buffer.from("FF078069", "hex");

// === Estrutura da tag simulada ===

/**
 * Cria um setor completo com 4 blocos.
 * O bloco 3 (trailer) é preenchido com Key A + bits de acesso + Key B,
 * conforme a estrutura real do hardware.
 *
 * Estrutura do trailer (16 bytes):
 *   [0..5]   Key A       (6 bytes)
 *   [6..9]   Access bits (4 bytes)
 *   [10..15] Key B       (6 bytes)
 */
function createSector() {
  // Inicializa todos os blocos com zeros (simulando tag gravada de fábrica)
  const blocks = Array.from({ length: BLOCKS_PER_SECTOR }, () => Buffer.alloc(BLOCK_SIZE, 0x00));

  // Monta o setor trailer no bloco 3
  const trailer = Buffer.concat([KEY_A, ACCESS_BITS, KEY_B]);
  blocks[3] = trailer;

  return { authenticated: false, blocks };
}

/** Tag simulada com 2 setores (para manter o lab simples). */
const tag = {
  uid: "DE AD BE EF",
  sectors: Array.from({ length: 2 }, createSector),
};

// === Operações sobre a tag ===

/**
 * Simula a autenticação de um setor com uma chave.
 * Na MIFARE Classic real, a autenticação usa o protocolo Crypto-1
 * (proprietário da NXP). Aqui simplificamos para uma comparação direta.
 *
 * @param {number} sectorIndex - Índice do setor (0 ou 1 neste lab)
 * @param {string} keyHex - Chave em hexadecimal (12 caracteres = 6 bytes)
 * @returns {boolean} true se a chave corresponde à Key A do trailer
 */
function authenticate(sectorIndex, keyHex) {
  const sector = tag.sectors[sectorIndex];
  const trailer = sector.blocks[3];

  // Compara a chave fornecida com os primeiros 6 bytes do trailer (Key A)
  const accepted = trailer.subarray(0, 6).equals(Buffer.from(keyHex, "hex"));
  sector.authenticated = accepted;
  return accepted;
}

/**
 * Lê um bloco de um setor. Exige autenticação prévia para blocos de dados.
 * O trailer (bloco 3) pode ser lido mesmo sem autenticação para inspeção.
 *
 * @param {number} sectorIndex - Índice do setor
 * @param {number} blockIndex - Índice do bloco (0–3)
 * @returns {Buffer} Conteúdo do bloco (16 bytes)
 */
function readBlock(sectorIndex, blockIndex) {
  const sector = tag.sectors[sectorIndex];
  if (!sector.authenticated && blockIndex !== 3) {
    throw new Error("Leitura negada: setor ainda nao autenticado.");
  }
  return sector.blocks[blockIndex];
}

/**
 * Escreve dados em um bloco. Escrita no trailer é proibida neste lab
 * para evitar corrupção da estrutura de chaves.
 *
 * @param {number} sectorIndex - Índice do setor
 * @param {number} blockIndex - Índice do bloco (0–2, o bloco 3 é protegido)
 * @param {string} asciiText - Texto ASCII a gravar (truncado em 16 bytes)
 */
function writeBlock(sectorIndex, blockIndex, asciiText) {
  if (blockIndex === 3) {
    throw new Error("Escrita no setor trailer nao e permitida neste laboratorio.");
  }
  const sector = tag.sectors[sectorIndex];
  if (!sector.authenticated) {
    throw new Error("Escrita negada: setor ainda nao autenticado.");
  }

  // Preenche com espaços (0x20) e grava o texto — simula escrita real
  const data = Buffer.alloc(BLOCK_SIZE, 0x20);
  data.write(asciiText.slice(0, BLOCK_SIZE), "ascii");
  sector.blocks[blockIndex] = data;
}

// ══════════════════════════════════════════════════════════════
// Demonstração passo a passo
// ══════════════════════════════════════════════════════════════

console.log("=== Tag simulada MIFARE Classic ===");
console.log(`UID: ${tag.uid}`);
console.log(`Setores simulados: ${tag.sectors.length}`);
console.log(`Blocos por setor: ${BLOCKS_PER_SECTOR} (3 de dados + 1 trailer)`);
console.log(`Tamanho de cada bloco: ${BLOCK_SIZE} bytes`);

// --- Passo 1: Tentar ler sem autenticação ---
console.log("");
console.log("--- Passo 1: Leitura sem autenticacao ---");
console.log("Tentando ler bloco 0 do setor 1 sem autenticar...");
try {
  console.log(readBlock(1, 0).toString("hex"));
} catch (error) {
  console.log(` \u2717 ${error.message}`);
}

// --- Passo 2: Autenticar o setor ---
console.log("");
console.log("--- Passo 2: Autenticacao ---");
console.log("Autenticando setor 1 com Key A padrao (FFFFFFFFFFFF)...");
const ok = authenticate(1, "FFFFFFFFFFFF");
console.log(` ${ok ? "\u2713" : "\u2717"} Autenticacao: ${ok ? "sucesso" : "falha"}`);

// --- Passo 3: Escrever um DID no bloco 0 ---
console.log("");
console.log("--- Passo 3: Escrita de dados ---");
const didToWrite = "did:example:1234";
console.log(`Escrevendo "${didToWrite}" no bloco 0 do setor 1...`);
writeBlock(1, 0, didToWrite);
const written = readBlock(1, 0);
console.log(` \u2713 Bloco 0 (ASCII): ${written.toString("ascii")}`);
console.log(` \u2713 Bloco 0 (hex):   ${written.toString("hex")}`);

// --- Passo 4: Inspecionar o setor trailer ---
console.log("");
console.log("--- Passo 4: Inspecao do setor trailer ---");
console.log("Lendo o trailer (bloco 3) do setor 1...");
const trailer = readBlock(1, 3);
console.log(` \u2022 Key A (6 bytes):        ${trailer.subarray(0, 6).toString("hex")}`);
console.log(` \u2022 Bits de acesso (4 bytes): ${trailer.subarray(6, 10).toString("hex")}`);
console.log(` \u2022 Key B (6 bytes):        ${trailer.subarray(10, 16).toString("hex")}`);

// --- Análise final ---
console.log("");
console.log("--- Analise ---");
console.log(" \u2022 A protecao nativa depende de chaves estaticas de 6 bytes \u2014 vulneravel a ataques de replay e forca bruta.");
console.log(" \u2022 A chave padrao FFFFFFFFFFFF e publica \u2014 nunca use em producao.");
console.log(" \u2022 O DIDGuard mitiga isso adicionando HMAC, contador monotônico e desafio-resposta sobre o canal RFID.");
