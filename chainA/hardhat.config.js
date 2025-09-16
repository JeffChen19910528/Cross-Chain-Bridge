// hardhat.config.js for Chain A

require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337, // 注意：使用不同的 chainId
    },
  },
};