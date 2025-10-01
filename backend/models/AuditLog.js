const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    action: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    electionId: Number,
    blockchainTxId: String
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditSchema);
