🚀 Cross-Chain Bridge 啟動與測試流程

一個最小可行的跨鏈訊息橋接範例：兩條本地 Hardhat 鏈 + 一個 Relayer，負責監聽事件並將訊息從一條鏈轉送到另一條鏈。

## 專案結構

```
.
├── chainA/          Chain A 的獨立 Hardhat 專案（合約、部署、測試腳本）
├── chainB/          Chain B 的獨立 Hardhat 專案（合約、部署、測試腳本）
├── config.js        Relayer 的鏈設定與私鑰（讀取 .env）
├── bridge.js         載入已部署合約的共用邏輯
├── relayer.js        監聽兩條鏈事件並互相轉送訊息
└── .env.example      環境變數範例
```

chainA 與 chainB 是彼此獨立的 Hardhat 專案（各自的 `package.json`、`node_modules`），互不依賴；根目錄的 Relayer 只透過 `bridge_addresses.json` 與編譯後的 ABI 與它們互動，降低耦合。

## 1️⃣ Install Dependencies

首先進入專案根目錄與各子專案，安裝所需套件。

```bash
cd Cross-Chain-Bridge
npm install

cd chainA
npm install

cd ../chainB
npm install
```

## 2️⃣ (可選) 設定環境變數

根目錄複製一份 `.env.example` 為 `.env`，可依需求調整 RPC 位址與私鑰；未設定時會使用預設值（本地 Hardhat 節點、Hardhat 內建測試帳號私鑰）。

```bash
cp .env.example .env
```

## 3️⃣ Start Hardhat Nodes

請開啟 兩個獨立的 Terminal 視窗，分別啟動 Chain A 與 Chain B 的本地節點。

🟢 Terminal 1：Chain A
```bash
cd chainA
npx hardhat node
```
預設使用 http://127.0.0.1:8545

🔵 Terminal 2：Chain B
```bash
cd chainB
npx hardhat node --port 8546
```
使用不同的 Port 以模擬第二條區塊鏈

## 4️⃣ Deploy Contracts

請再開一個新的 Terminal，將 MessageBridge 合約部署到兩條鏈上。

📦 Deploy to Chain A
```bash
cd chainA
npx hardhat run scripts/deploy.js --network localhost
```

📦 Deploy to Chain B
```bash
cd chainB
npx hardhat run scripts/deploy.js --network localhost
```

## 5️⃣ Run the Relayer

Relayer 會監聽兩條鏈的事件，並負責轉送跨鏈訊息。

```bash
cd Cross-Chain-Bridge
npm run relayer
```

📌 請確保 Chain A 與 Chain B 的節點都已正常啟動，且合約已部署

## 6️⃣ Test the Bridge

最後，開啟新的 Terminal 視窗，執行測試腳本以驗證跨鏈功能。

🔁 Send Message from Chain A → Chain B
```bash
cd chainA
npx hardhat run scripts/test.js --network localhost
```

🔁 Send Message from Chain B → Chain A
```bash
cd chainB
npx hardhat run scripts/test.js --network localhost
```

Relayer 的終端機會印出捕捉到的訊息與轉送結果。
