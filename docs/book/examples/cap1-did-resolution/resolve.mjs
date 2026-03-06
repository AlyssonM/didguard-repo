/**
 * resolve.mjs — Resolvedor simplificado para o método did:web.
 *
 * O que este script faz:
 *   1. Recebe um DID como argumento de linha de comando
 *   2. Converte o DID em uma URL HTTP seguindo o algoritmo da spec did:web
 *   3. Faz um fetch HTTP para baixar o DID Document
 *   4. Exibe os campos principais do documento
 *
 * Uso:
 *   node resolve.mjs did:web:localhost%3A8081:users:alice
 *
 * Referência: https://w3c-ccg.github.io/did-method-web/#read-resolve
 */

// --- Validação de entrada ---

const did = process.argv[2];

if (!did) {
  console.error("Uso: node resolve.mjs did:web:localhost%3A8081:users:alice");
  process.exit(1);
}

if (!did.startsWith("did:web:")) {
  console.error("Este resolvedor simplificado aceita apenas did:web.");
  process.exit(1);
}

// --- Algoritmo de resolução did:web ---

/**
 * Converte um identificador did:web em uma URL HTTP.
 *
 * Algoritmo (conforme a spec):
 *   did:web:localhost%3A8081:users:alice
 *          ├── host (URL-encoded) ──┤├ path ┤
 *
 *   Passo 1: Extrair a parte após "did:web:"
 *   Passo 2: O primeiro segmento (separado por ":") é o host — decodificar %3A → ":"
 *   Passo 3: Os segmentos restantes viram o caminho do URL (":"--> "/")
 *   Passo 4: Acrescentar "/did.json" ao final
 *
 * Exemplo:
 *   did:web:localhost%3A8081:users:alice
 *   → host = localhost:8081
 *   → path = /users/alice
 *   → URL  = http://localhost:8081/users/alice/did.json
 *
 * @param {string} inputDid - O DID a ser resolvido, ex.: "did:web:example.com:users:bob"
 * @returns {string} URL HTTP correspondente
 */
function didWebToUrl(inputDid) {
  // Remove o prefixo do método para obter a parte específica
  const methodSpecificId = inputDid.slice("did:web:".length);

  // Separa por ":" — o primeiro elemento é o host, os demais formam o path
  const parts = methodSpecificId.split(":");
  const host = decodeURIComponent(parts[0]); // %3A → ":" para portas
  const pathParts = parts.slice(1);

  // Reconstrói o caminho HTTP:  ["users", "alice"] → "/users/alice"
  const path = pathParts.length > 0 ? `/${pathParts.join("/")}` : "";

  // Na spec, usa-se HTTPS por padrão. Usamos HTTP aqui por ser localhost.
  return `http://${host}${path}/did.json`;
}

// --- Resolução e exibição ---

const url = didWebToUrl(did);
console.log(`Resolvendo: ${did}`);
console.log(`URL derivado: ${url}`);

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Falha ao resolver DID: ${response.status} ${response.statusText}`);
}

const document = await response.json();
console.log("");

// Mostra um resumo dos campos principais do DID Document.
// Cada campo tem um papel distinto na arquitetura DID:
//   - id: o próprio identificador descentralizado
//   - verificationMethod: chaves públicas associadas ao DID
//   - authentication: quais chaves podem autenticar o sujeito
//   - assertionMethod: quais chaves podem emitir declarações (ex.: VCs)
//   - service: endpoints de serviço associados (ex.: perfil, mensagens)
console.log("Campos principais do DID Document:");
console.log(`- id: ${document.id}`);
console.log(`- verificationMethod: ${document.verificationMethod?.length ?? 0} chave(s)`);
console.log(`- authentication: ${document.authentication?.length ?? 0} referencia(s)`);
console.log(`- assertionMethod: ${document.assertionMethod?.length ?? 0} referencia(s)`);
console.log(`- service: ${document.service?.length ?? 0} endpoint(s)`);
console.log("");
console.log("Documento completo:");
console.log(JSON.stringify(document, null, 2));
