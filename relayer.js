const ethers = require("ethers");
const { CHAINS, PRIVATE_KEY } = require("./config");
const { loadBridge } = require("./bridge");

// Forwards every MessageSent event from `source` to `target` by calling
// receiveMessage() with the same id/message/hash. Returns an unsubscribe
// function so the caller can clean up on shutdown.
function relay(source, target) {
  const listener = async (messageId, message, messageHash) => {
    console.log(`\n[${source.name} -> ${target.name}] Caught message ${messageId}`);
    console.log(`  Message: ${message}`);
    console.log(`  Hash: ${messageHash}`);

    try {
      const tx = await target.write.receiveMessage(messageId, message, messageHash);
      await tx.wait();
      console.log(`  Relayed to ${target.name} successfully.`);
    } catch (error) {
      console.error(`  Failed to relay to ${target.name}:`, error.message);
    }
  };

  source.read.on("MessageSent", listener);
  return () => source.read.off("MessageSent", listener);
}

function main() {
  const wallet = new ethers.Wallet(PRIVATE_KEY);
  const [chainA, chainB] = CHAINS.map((chain) => loadBridge(chain, wallet));

  const unsubscribers = [relay(chainA, chainB), relay(chainB, chainA)];

  console.log("Relayer is listening for messages... (Press Ctrl+C to exit)");

  process.on("SIGINT", () => {
    console.log("\nShutting down relayer...");
    unsubscribers.forEach((unsubscribe) => unsubscribe());
    process.exit(0);
  });
}

main();
