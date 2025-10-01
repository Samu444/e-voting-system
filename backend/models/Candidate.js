const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    electionId: Number,
    name: String,
    party: String,
    blockchainId: Number,
    voteCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", candidateSchema);
