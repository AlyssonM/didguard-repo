/**
 * demo.js — Demonstração interativa do contrato AccessRegistry.
 *
 * Este script ilustra o ciclo completo de interação com um contrato:
 *   1. Conecta-se a um contrato já implantado (via endereço em variável de ambiente)
 *   2. Envia uma transação de ESCRITA (setAccess) que consome gas
 *   3. Faz uma chamada de LEITURA (getAccess) que não consome gas
 *   4. Captura o evento AccessUpdated dos logs da transação
 *
 * Pré-requisito: execute deploy.js primeiro e exporte ACCESS_REGISTRY_ADDRESS.
 */
const hre = require("hardhat");

async function main() {
  // --- Conexão com o contrato implantado ---
  const address = process.env.ACCESS_REGISTRY_ADDRESS;
  if (!address) {
    throw new Error(
      "Defina ACCESS_REGISTRY_ADDRESS com o endereco do contrato implantado.\n" +
      "Exemplo (PowerShell): $env:ACCESS_REGISTRY_ADDRESS=\"0x...\"\n" +
      "Exemplo (Bash):       ACCESS_REGISTRY_ADDRESS=0x... npx hardhat run ..."
    );
  }

  // getContractAt conecta ao contrato já implantado.
  // Diferente de deploy(), aqui não criamos um novo contrato.
  const contract = await hre.ethers.getContractAt("AccessRegistry", address);

  // --- Preparação dos dados ---

  // ethers.id() calcula keccak256 de uma string UTF-8.
  // É equivalente ao Solidity: keccak256(abi.encodePacked("did:example:alice"))
  const credentialId = hre.ethers.id("did:example:alice");

  // Expiração: 1 hora no futuro (Unix timestamp em segundos)
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;

  // --- Transação de escrita (consome gas) ---

  console.log(`Atualizando acesso de ${credentialId.slice(0, 10)}... (hash do DID "did:example:alice")`);
  const tx = await contract.setAccess(credentialId, true, expiresAt);

  // wait() bloqueia até a transação ser minerada.
  // O receipt contém o hash, gas usado, logs (eventos) e status.
  const receipt = await tx.wait();
  console.log(` \u2713 Hash da transacao: ${receipt.hash}`);

  // --- Leitura do estado (não consome gas) ---

  // Funções view são executadas localmente pelo nó — não geram transação.
  const [allowed, storedExpiresAt] = await contract.getAccess(credentialId);
  console.log(` \u2713 Allowed: ${allowed}`);
  console.log(` \u2713 ExpiresAt: ${storedExpiresAt} (Unix timestamp, ~1h no futuro)`);

  // --- Captura de eventos ---

  // Eventos são armazenados nos logs da transação.
  // Para lê-los, parseamos cada log usando a ABI do contrato.
  const event = receipt.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null; // Ignora logs que não pertencem ao nosso contrato
      }
    })
    .find(Boolean);

  if (event) {
    console.log(` \u2713 Evento capturado: ${event.name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
