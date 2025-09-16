1. Install Dependencies
First, navigate to the project root and install all necessary modules.

cd ~/simple-bridge
npm install

cd ~/simple-bridge/chainA
npm install

cd ~/simple-bridge/chainB
npm install


2. Start Hardhat Nodes
Open two separate terminal windows to run the Hardhat nodes for Chain A and Chain B.

Terminal 1 (Chain A)
cd ~/simple-bridge/chainA
npx hardhat node

Terminal 2 (Chain B)
cd ~/simple-bridge/chainB
npx hardhat node --port 8546

3. Deploy Contracts
Open a new terminal window to deploy the MessageBridge contracts to both chains.

# Deploy to Chain A
cd ~/simple-bridge/chainA
npx hardhat run scripts/deploy.js --network localhost

# Deploy to Chain B
cd ~/simple-bridge/chainB
npx hardhat run scripts/deploy.js --network localhost

4. Run the Relayer
Start the relayer script, which listens for events on both chains and relays messages.

cd ~/simple-bridge
npx hardhat run relyer.js

5. Test the Bridge
Open another terminal window and run the test scripts to send messages across the bridge.

# Send a message from Chain A
cd ~/simple-bridge/chainA
npx hardhat run scripts/test.js --network localhost

# Send a message from Chain B
cd ~/simple-bridge/chainB
npx hardhat run scripts/test.js --network localhost