const express = require("express");
const router = express.Router();
const { castVote } = require("../controllers/voteController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/vote", authMiddleware, roleMiddleware("voter"), castVote);

module.exports = router;
