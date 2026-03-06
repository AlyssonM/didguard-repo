/**
 * demo-auto.js — Versão unificada que faz deploy + demo sem intervenção manual.
 *
 * Este script elimina a necessidade de copiar o endereço do contrato entre
 * terminais. Útil para quem quer ver o lab funcionando rapidamente.
 *
 * Uso:
 *   npx hardhat run scripts/demo-auto.js --network localhost
 *
 * Pré-requisito: ter o nó Hardhat rodando (npx hardhat node)
 */
const hre = require("hardhat");

async function main() {
    // === Fase 1: Deploy ===
    console.log("--- Fase 1: Deploy do contrato ---");
    const factory = await hre.ethers.getContractFactory("AccessRegistry");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    console.log(` \u2713 AccessRegistry implantado em: ${address}`);

    // === Fase 2: Registro de acesso ===
    console.log("");
    console.log("--- Fase 2: Registro de acesso ---");

    const credentialId = hre.ethers.id("did:example:alice");
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;

    console.log(`Concedendo acesso para "did:example:alice"...`);
    const tx = await contract.setAccess(credentialId, true, expiresAt);
    const receipt = await tx.wait();
    console.log(` \u2713 Hash da transacao: ${receipt.hash}`);

    // === Fase 3: Leitura do estado ===
    console.log("");
    console.log("--- Fase 3: Leitura do estado on-chain ---");

    const [allowed, storedExpiresAt] = await contract.getAccess(credentialId);
    console.log(` \u2713 Allowed: ${allowed}`);
    console.log(` \u2713 ExpiresAt: ${storedExpiresAt}`);

    // === Fase 4: Captura de evento ===
    console.log("");
    console.log("--- Fase 4: Evento de auditoria ---");

    const event = receipt.logs
        .map((log) => {
            try {
                return contract.interface.parseLog(log);
            } catch {
                return null;
            }
        })
        .find(Boolean);

    if (event) {
        console.log(` \u2713 Evento: ${event.name}`);
        console.log(` \u2713 Args: credentialId=${event.args[0].slice(0, 10)}..., allowed=${event.args[1]}, expiresAt=${event.args[2]}`);
    }

    console.log("");
    console.log("Lab concluido com sucesso!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
