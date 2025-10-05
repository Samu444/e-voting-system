import { viem } from "hardhat";

async function main() {
    console.log("Deploying Voting contract...");

    const contract = await viem.deployContract("Voting");
    console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
