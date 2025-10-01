const { ethers } = require("ethers");
require("dotenv").config();
const votingABI = require("../abis/VotingABI.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.VOTING_CONTRACT_ADDRESS;

const votingContract = new ethers.Contract(contractAddress, votingABI, wallet);
module.exports = votingContract;
