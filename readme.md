1. Install Dependencies  

First, navigate to the project root and install all necessary modules.  

cd ~/Cross-Chain-Bridge  

npm install  

cd ~/Cross-Chain-Bridge/chainA  

npm install  

cd ~/Cross-Chain-Bridge/chainB  

npm install  

--------------------------------------------------------------------------------------
2. Start Hardhat Nodes  

Open two separate terminal windows to run the Hardhat nodes for Chain A and Chain B.  

Terminal 1 (Chain A)  

cd ~/Cross-Chain-Bridge/chainA  

npx hardhat node  


Terminal 2 (Chain B)  

cd ~/Cross-Chain-Bridge/chainB  

npx hardhat node --port 8546  

--------------------------------------------------------------------------------------
3. Deploy Contracts  

Open a new terminal window to deploy the MessageBridge contracts to both chains.  


Deploy to Chain A  

cd ~/Cross-Chain-Bridge/chainA  

npx hardhat run scripts/deploy.js --network localhost  


Deploy to Chain B  

cd ~/Cross-Chain-Bridge/chainB  

npx hardhat run scripts/deploy.js --network localhost  

--------------------------------------------------------------------------------------  
4. Run the Relayer  

Start the relayer script, which listens for events on both chains and relays messages.  


cd ~/Cross-Chain-Bridge   

npx hardhat run relyer.js  

--------------------------------------------------------------------------------------
5. Test the Bridge  

Open another terminal window and run the test scripts to send messages across the bridge.  


Send a message from Chain A:  

cd ~/Cross-Chain-Bridge/chainA  

npx hardhat run scripts/test.js --network localhost  


Send a message from Chain B:  

cd ~/Cross-Chain-Bridge/chainB  

npx hardhat run scripts/test.js --network localhost  