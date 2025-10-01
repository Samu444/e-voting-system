const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    name: String,
    active: { type: Boolean, default: false },
    blockchainId: Number,
    candidateIds: [Number]
}, { timestamps: true });

module.exports = mongoose.model("Election", electionSchema);
