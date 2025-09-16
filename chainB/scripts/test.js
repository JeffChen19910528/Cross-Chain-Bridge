const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const Bridge = await hre.ethers.getContractFactory("MessageBridge");

  // 從 bridge_addresses.json 檔案讀取合約地址
  const addressesPath = path.join(__dirname, '../bridge_addresses.json');
  if (!fs.existsSync(addressesPath)) {
    console.error("Error: bridge_addresses.json file not found. Please run the deploy script first.");
    process.exit(1);
  }
  
  const addresses = JSON.parse(fs.readFileSync(addressesPath, 'utf8'));
  const bridgeBAddress = addresses.bridgeB; // <-- 只修改這裡

  if (!bridgeBAddress) {
    console.error("Error: bridgeBAddress not found in bridge_addresses.json");
    process.exit(1);
  }

  // 連接到 Chain B 上已經部署的合約
  const bridgeB = new hre.ethers.Contract(
    bridgeBAddress,
    Bridge.interface,
    owner
  );

  console.log("Sending a message from Chain B...");

  // 呼叫 sendMessage 函式，並加入時間戳記以確保訊息獨一無二
  const message = `Hello from Chain B! (timestamp: ${new Date().getTime()})`;
  const tx = await bridgeB.sendMessage(message);

  console.log("Transaction hash:", tx.hash);

  await tx.wait(); // 等待交易被打包

  console.log("Message sent successfully. Check your relayer!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});