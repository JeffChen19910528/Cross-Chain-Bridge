// hardhat.config.js for Chain B

require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1338,
    },
    localhost: {
      url: "http://127.0.0.1:8546" // 添加這個URL
    }
  },
};