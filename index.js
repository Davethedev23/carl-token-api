const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const app = express();
const port = process.env.PORT || 3000;

// Create the Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Mint address (change this to your token's mint address)
const mintAddress = new PublicKey('8ormtSPotkF72CbPHehPz2fuHZY6WaE6hrEsy4xdXQxx');

// Hardcoded Total Supply (1 billion tokens)
const TOTAL_SUPPLY = 1000000000; // 1 billion tokens

// Function to get Current Supply from the Solana blockchain
async function getCurrentSupply() {
    try {
        const tokenSupply = await connection.getTokenSupply(mintAddress);
        return tokenSupply.value.uiAmount; // Returns the current supply
    } catch (error) {
        throw new Error('Failed to fetch current supply');
    }
}

// Test route to check if server is working
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Route for Total Supply (hardcoded)
app.get('/api/token/total-supply', (req, res) => {
    try {
        res.json({ totalSupply: TOTAL_SUPPLY });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for Current Supply (fetched from Solana)
app.get('/api/token/current-supply', async (req, res) => {
    try {
        const currentSupply = await getCurrentSupply();
        res.json({ currentSupply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
