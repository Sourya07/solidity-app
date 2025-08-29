"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bip39_1 = require("bip39");
const ethers_1 = require("ethers");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
console.log(config_1.Mnemonics);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Keep track of how many wallets have been generated
let currentIndex = 0;
// Function to generate a new ETH wallet address from mnemonic
const generateNewWallet = (Mnemonics, index) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Mnemonics || !(0, bip39_1.validateMnemonic)(Mnemonics)) {
        throw new Error("Invalid Mnemonics phrase");
    }
    const seed = yield (0, bip39_1.mnemonicToSeed)(Mnemonics);
    const hdNode = ethers_1.HDNodeWallet.fromSeed(seed);
    // Standard Ethereum derivation path: m/44'/60'/0'/0/index
    const derivationPath = `m/44'/60'/0'/0/${index}`;
    const child = hdNode.derivePath(derivationPath);
    console.log(child);
    const wallet = new ethers_1.Wallet(child.privateKey);
    return wallet;
});
// Signup endpoint
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        // Generate a new wallet
        const wallet = yield generateNewWallet(config_1.Mnemonics, currentIndex);
        // Increment index for next signup
        currentIndex++;
        // You’d normally save username, password (hashed), and wallet.address in DB here
        res.json({
            msg: "Signup successful",
            username,
            ethAddress: wallet.address,
            privateKey: wallet.privateKey, // ⚠️ Don’t expose private keys in real apps!
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
app.listen(3000, () => {
    console.log("Server running on http://localhost:5173");
});
