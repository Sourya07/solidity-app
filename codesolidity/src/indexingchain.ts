import { ethers } from "ethers";

async function main() {
    const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>");

    const blockNumber = 26803; // 🔹 replace with your block number
    const targetTxHash = "0xa0807e117a8dd124ab949f460f08c36c72b710188f01609595223b325e58e0fc"; // 🔹 replace with your tx hash

    // ✅ Get block with full transactions
    const block = await provider.getBlock(blockNumber, true);

    if (!block) {
        console.log("Block not found");
        return;
    }

    console.log(`🔹 Block #${block.number} contains ${block.prefetchedTransactions.length} transactions`);

    // ✅ Search transaction in block
    const tx = block.prefetchedTransactions.find(t => t.hash.toLowerCase() === targetTxHash.toLowerCase());

    if (tx) {
        console.log("✅ Transaction FOUND in block!");
        console.log(tx);
    } else {
        console.log("❌ Transaction NOT found in this block");
    }
}

main().catch(console.error);