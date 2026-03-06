/**
 * deploy.js — Implanta o contrato AccessRegistry na blockchain local.
 *
 * Este script:
 *   1. Compila o contrato (Hardhat faz isso automaticamente se necessário)
 *   2. Cria uma instância do contrato na blockchain
 *   3. Aguarda a confirmação da transação de deploy
 *   4. Imprime o endereço do contrato implantado
 *
 * O endereço precisa ser copiado para a variável de ambiente
 * ACCESS_REGISTRY_ADDRESS antes de executar demo.js.
 */
const hre = require("hardhat");

async function main() {
  // getContractFactory retorna um "factory" capaz de implantar novas instâncias
  // do contrato. O Hardhat resolve o nome "AccessRegistry" a partir do diretório
  // contracts/ automaticamente.
  const factory = await hre.ethers.getContractFactory("AccessRegistry");

  // deploy() envia uma transação de criação para a blockchain.
  // Em uma rede real, isso consumiria gas (ETH).
  const contract = await factory.deploy();

  // Aguarda até que a transação seja minerada (confirmada)
  await contract.waitForDeployment();

  // O endereço é determinístico: depende do nonce do deployer.
  console.log(`AccessRegistry implantado em: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
