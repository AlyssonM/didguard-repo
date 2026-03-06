/**
 * server.mjs — Servidor HTTP local que simula a publicação de um DID Document.
 *
 * Na spec did:web, o DID Document é servido como um arquivo JSON estático
 * em uma URL derivada do identificador. Este servidor implementa duas rotas:
 *
 *   /users/alice/did.json   → retorna o DID Document
 *   /users/alice/profile    → retorna dados de perfil (serviço vinculado)
 *
 * Referência: https://w3c-ccg.github.io/did-method-web/#read-resolve
 */

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Caminhos do módulo ES (equivalente a __dirname em CommonJS) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega o DID Document uma única vez na inicialização.
// Em produção, o documento seria servido por um web server convencional (Nginx, Caddy etc.).
const didDocument = readFileSync(join(__dirname, "did.json"), "utf8");

const server = createServer((req, res) => {
  // Rota principal: serve o DID Document.
  // O caminho /users/alice/did.json é derivado do DID:
  //   did:web:localhost%3A8081:users:alice  →  http://localhost:8081/users/alice/did.json
  if (req.url === "/users/alice/did.json") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(didDocument);
    return;
  }

  // Rota secundária: simula um endpoint de serviço declarado no campo "service"
  // do DID Document (tipo LinkedDomains). Isso mostra que um DID pode apontar
  // para recursos auxiliares além do próprio documento.
  if (req.url === "/users/alice/profile") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ name: "Alice Example", role: "student" }, null, 2));
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(8081, () => {
  console.log("Servidor do laboratorio ouvindo em http://localhost:8081");
  console.log("DID disponivel em did:web:localhost%3A8081:users:alice");
});
