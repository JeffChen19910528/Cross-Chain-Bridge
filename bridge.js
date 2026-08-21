const fs = require("fs");
const path = require("path");
const ethers = require("ethers");

// Loads one chain's deployed MessageBridge contract, wiring up both a
// read-only instance (for listening to events) and a write instance
// (for submitting transactions with the relayer's wallet).
function loadBridge(chain, wallet) {
  const addressesPath = path.resolve(__dirname, chain.dir, "bridge_addresses.json");
  const artifactPath = path.resolve(
    __dirname,
    chain.dir,
    "artifacts/contracts/MessageBridge.sol/MessageBridge.json"
  );

  if (!fs.existsSync(addressesPath)) {
    throw new Error(
      `${addressesPath} not found. Deploy the contract on ${chain.name} first.`
    );
  }
  if (!fs.existsSync(artifactPath)) {
    throw new Error(
      `${artifactPath} not found. Run "npx hardhat compile" in ${chain.dir} first.`
    );
  }

  const address = JSON.parse(fs.readFileSync(addressesPath, "utf8"))[chain.addressKey];
  if (!address) {
    throw new Error(`No "${chain.addressKey}" address found in ${addressesPath}.`);
  }

  const { abi } = require(artifactPath);
  const provider = new ethers.providers.JsonRpcProvider(chain.providerUrl);

  return {
    name: chain.name,
    address,
    read: new ethers.Contract(address, abi, provider),
    write: new ethers.Contract(address, abi, wallet.connect(provider)),
  };
}

module.exports = { loadBridge };
