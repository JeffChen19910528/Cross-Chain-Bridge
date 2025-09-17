const hre = require("hardhat");
const ethers = require("ethers");
const fs = require('fs');
const path = require('path');

// 設置兩個獨立的Provider
const providerA = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const providerB = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8546");

// 從 Hardhat 的第一個帳號獲取簽名者
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"); 

async function main() {
  // 讀取 Chain A 和 Chain B 的合約地址
  const bridgeA_path = path.resolve(__dirname, 'chainA/bridge_addresses.json');
  const bridgeB_path = path.resolve(__dirname, 'chainB/bridge_addresses.json');

  const bridgeA_addresses = JSON.parse(fs.readFileSync(bridgeA_path, 'utf8'));
  const bridgeB_addresses = JSON.parse(fs.readFileSync(bridgeB_path, 'utf8'));

  const bridgeAAddress = bridgeA_addresses.bridgeA;
  const bridgeBAddress = bridgeB_addresses.bridgeB;

  // 載入合約 ABI
  const bridgeA_artifact = require('./chainA/artifacts/contracts/MessageBridge.sol/MessageBridge.json');
  const bridgeB_artifact = require('./chainB/artifacts/contracts/MessageBridge.sol/MessageBridge.json');

  // 連接到 Chain A 合約 (可讀可寫)
  const bridgeA_read = new ethers.Contract(bridgeAAddress, bridgeA_artifact.abi, providerA);
  const bridgeA_write = new ethers.Contract(bridgeAAddress, bridgeA_artifact.abi, wallet.connect(providerA));

  // 連接到 Chain B 合約 (可讀可寫)
  const bridgeB_read = new ethers.Contract(bridgeBAddress, bridgeB_artifact.abi, providerB);
  const bridgeB_write = new ethers.Contract(bridgeBAddress, bridgeB_artifact.abi, wallet.connect(providerB));

  console.log("Relayer is listening for messages...");

  // 監聽 Chain A 的事件並中繼到 Chain B
  // 新增了 messageHash 參數
  bridgeA_read.on("MessageSent", async (messageId, message, messageHash) => {
    console.log("\nRelayer caught a message on Chain A!");
    console.log(`Message ID: ${messageId}`);
    console.log(`Message: ${message}`);
    console.log(`Message Hash: ${messageHash}`); // 新增: 顯示哈希值
    console.log(`Relaying message to Chain B...`);

    try {
      // 在呼叫 receiveMessage 時，同時傳送 message 和 messageHash
      const tx = await bridgeB_write.receiveMessage(messageId, message, messageHash);
      await tx.wait(); // 等待交易確認
      console.log("Message successfully relayed to Chain B!");
    } catch (error) {
      console.error("Error relaying message:", error);
    }
  });

  // 監聽 Chain B 的事件並中繼到 Chain A
  // 新增了 messageHash 參數
  bridgeB_read.on("MessageSent", async (messageId, message, messageHash) => {
    console.log("\nRelayer caught a message on Chain B!");
    console.log(`Message ID: ${messageId}`);
    console.log(`Message: ${message}`);
    console.log(`Message Hash: ${messageHash}`); // 新增: 顯示哈希值
    console.log(`Relaying message to Chain A...`);

    try {
      // 在呼叫 receiveMessage 時，同時傳送 message 和 messageHash
      const tx = await bridgeA_write.receiveMessage(messageId, message, messageHash);
      await tx.wait(); // 等待交易確認
      console.log("Message successfully relayed to Chain A!");
    } catch (error) {
      console.error("Error relaying message:", error);
    }
  });

  console.log("Waiting for events... (Press Ctrl+C to exit)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});