const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    electionId: Number,
    candidateId: Number,
    blockchainTxId: String
}, { timestamps: true });

module.exports = mongoose.model("Vote", voteSchema);
