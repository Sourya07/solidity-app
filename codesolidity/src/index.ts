
import express, { Request, Response } from "express";
import { mnemonicToSeed, validateMnemonic } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

import { Mnemonics } from "./config";
console.log(Mnemonics)

const app = express();
app.use(express.json());

// Keep track of how many wallets have been generated
let currentIndex = 0;

// Function to generate a new ETH wallet address from mnemonic
const generateNewWallet = async (Mnemonics: string, index: number) => {
    if (!Mnemonics || !validateMnemonic(Mnemonics)) {
        throw new Error("Invalid Mnemonics phrase");
    }
    const seed = await mnemonicToSeed(Mnemonics);
    const hdNode = HDNodeWallet.fromSeed(seed);

    // Standard Ethereum derivation path: m/44'/60'/0'/0/index
    const derivationPath = `m/44'/60'/0'/0/${index}`;
    const child = hdNode.derivePath(derivationPath);
    console.log(child)
    const wallet = new Wallet(child.privateKey);
    return wallet;
};

// Signup endpoint
app.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }

        // Generate a new wallet
        const wallet = await generateNewWallet(Mnemonics, currentIndex);

        // Increment index for next signup
        currentIndex++;

        // You’d normally save username, password (hashed), and wallet.address in DB here

        res.json({
            msg: "Signup successful",
            username,
            ethAddress: wallet.address,
            privateKey: wallet.privateKey, // ⚠️ Don’t expose private keys in real apps!
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});