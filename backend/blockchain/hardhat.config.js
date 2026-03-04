require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
      initialBaseFeePerGas: 0
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
