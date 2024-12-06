const express = require("express");
const { Connection, PublicKey } = require("@solana/web3.js");

const app = express();
const PORT = 3000;

// Solana RPC Endpoint
const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

// Token Mint Address (CA)
const TOKEN_MINT_ADDRESS = "8ormtSPotkF72CbPHehPz2fuHZY6WaE6hrEsy4xdXQxx";

// Constants
const TOTAL_SUPPLY = 1000000000; // 1 billion tokens
const BURNED_TOKENS = 50000000; // 50 million burned tokens
const CIRCULATING_SUPPLY = TOTAL_SUPPLY - BURNED_TOKENS; // Calculate circulating supply

// Endpoint to fetch total supply
app.get("/total-supply", (req, res) => {
  try {
    res.json({
      totalSupply: TOTAL_SUPPLY, // Return the total supply
    });
  } catch (error) {
    console.error("Error fetching total supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to fetch circulating supply
app.get("/circulating-supply", (req, res) => {
  try {
    res.json({
      circulatingSupply: CIRCULATING_SUPPLY, // Return circulating supply
    });
  } catch (error) {
    console.error("Error fetching circulating supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});