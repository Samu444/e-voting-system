const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // hashed
    role: { type: String, enum: ["voter", "admin"], default: "voter" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
