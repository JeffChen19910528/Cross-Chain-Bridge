const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const Bridge = await hre.ethers.getContractFactory("MessageBridge");
  const bridgeA = await Bridge.deploy(owner.address);
  await bridgeA.deployed();
  console.log(`Bridge A deployed to: ${bridgeA.address}`);

  // 儲存合約地址到 bridge_addresses.json
  const addresses = {
    bridgeA: bridgeA.address,
  };
  fs.writeFileSync(path.join(__dirname, '../bridge_addresses.json'), JSON.stringify(addresses, null, 2));
  console.log("Bridge A addresses saved to bridge_addresses.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});