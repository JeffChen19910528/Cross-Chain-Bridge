const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const Bridge = await hre.ethers.getContractFactory("MessageBridge");
  const bridgeB = await Bridge.deploy(owner.address);
  await bridgeB.deployed();
  console.log(`Bridge B deployed to: ${bridgeB.address}`);

  // 儲存合約地址到 bridge_addresses.json
  const addresses = {
    bridgeB: bridgeB.address,
  };
  fs.writeFileSync(path.join(__dirname, '../bridge_addresses.json'), JSON.stringify(addresses, null, 2));
  console.log("Bridge B addresses saved to bridge_addresses.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});