instll modules:
npm install

1. start node:
cd ~/simple-bridge/chainA && npx hardhat node
cd ~/simple-bridge/chainB && npx hardhat node --port 8546
2. Deployment Program:
cd ~/simple-bridge/chainA && npx hardhat run scripts/deploy.js --network localhost
cd ~/simple-bridge/chainB && npx hardhat run scripts/deploy.js --network localhost
3. run delayer:
cd ~/simple-bridge 
npx hardhat run relyer.js
4. test bridge:
cd ~/simple-bridge/chainA  or cd ~/simple-bridge/chainB
npx hardhat run scripts/test.js --network localhost