const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const app = express();
const port = 3000;

// Create the Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Mint address (change this to your token's mint address)
const mintAddress = new PublicKey('8ormtSPotkF72CbPHehPz2fuHZY6WaE6hrEsy4xdXQxx');

// Function to get Total Supply
async function getTotalSupply() {
    try {
        const tokenSupply = await connection.getTokenSupply(mintAddress);
        return tokenSupply.value.uiAmount;
    } catch (error) {
        throw new Error('Failed to fetch total supply');
    }
}

// Function to get Current Supply
async function getCurrentSupply() {
    try {
        const tokenSupply = await connection.getTokenSupply(mintAddress);
        return tokenSupply.value.uiAmount;
    } catch (error) {
        throw new Error('Failed to fetch current supply');
    }
}

// Test route to check if server is working
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Route for Total Supply
app.get('/api/token/total-supply', async (req, res) => {
    try {
        const totalSupply = await getTotalSupply();
        res.json({ totalSupply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for Current Supply
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
