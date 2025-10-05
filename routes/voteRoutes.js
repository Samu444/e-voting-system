const express = require("express");
const router = express.Router();
const { castVote, getResults } = require("../controllers/voteController");

router.post("/:electionId/vote", castVote);
router.get("/:electionId/results", getResults);

module.exports = router;
