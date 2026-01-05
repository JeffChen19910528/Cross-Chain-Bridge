🚀 Cross-Chain Bridge 啟動與測試流程

以下說明如何在本地環境啟動 Chain A / Chain B，部署合約，啟動 Relayer，並測試跨鏈訊息傳遞。

1️⃣ Install Dependencies

首先進入專案根目錄與各子專案，安裝所需套件。

cd ~/Cross-Chain-Bridge
npm install

cd ~/Cross-Chain-Bridge/chainA
npm install

cd ~/Cross-Chain-Bridge/chainB
npm install

2️⃣ Start Hardhat Nodes

請開啟 兩個獨立的 Terminal 視窗，分別啟動 Chain A 與 Chain B 的本地節點。

🟢 Terminal 1：Chain A
cd ~/Cross-Chain-Bridge/chainA
npx hardhat node


預設使用 http://127.0.0.1:8545

🔵 Terminal 2：Chain B
cd ~/Cross-Chain-Bridge/chainB
npx hardhat node --port 8546


使用不同的 Port 以模擬第二條區塊鏈

3️⃣ Deploy Contracts

請再開一個新的 Terminal，將 MessageBridge 合約部署到兩條鏈上。

📦 Deploy to Chain A
cd ~/Cross-Chain-Bridge/chainA
npx hardhat run scripts/deploy.js --network localhost

📦 Deploy to Chain B
cd ~/Cross-Chain-Bridge/chainB
npx hardhat run scripts/deploy.js --network localhost

4️⃣ Run the Relayer

Relayer 會監聽兩條鏈的事件，並負責轉送跨鏈訊息。

cd ~/Cross-Chain-Bridge
npx hardhat run relayer.js


📌 請確保 Chain A 與 Chain B 的節點都已正常啟動

5️⃣ Test the Bridge

最後，開啟新的 Terminal 視窗，執行測試腳本以驗證跨鏈功能。

🔁 Send Message from Chain A → Chain B
cd ~/Cross-Chain-Bridge/chainA
npx hardhat run scripts/test.js --network localhost

🔁 Send Message from Chain B → Chain A
cd ~/Cross-Chain-Bridge/chainB
npx hardhat run scripts/test.js --network localhost