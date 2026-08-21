require("dotenv").config();

// Hardhat's well-known test account #0 — safe as a default only because
// this project targets local Hardhat nodes. Override with PRIVATE_KEY for
// anything else.
const DEFAULT_TEST_PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const CHAINS = [
  {
    name: "Chain A",
    dir: "chainA",
    addressKey: "bridgeA",
    providerUrl: process.env.RPC_URL_A || "http://127.0.0.1:8545",
  },
  {
    name: "Chain B",
    dir: "chainB",
    addressKey: "bridgeB",
    providerUrl: process.env.RPC_URL_B || "http://127.0.0.1:8546",
  },
];

const PRIVATE_KEY = process.env.PRIVATE_KEY || DEFAULT_TEST_PRIVATE_KEY;

module.exports = { CHAINS, PRIVATE_KEY };
