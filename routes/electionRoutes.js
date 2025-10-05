const express = require("express");
const router = express.Router();
const { createElection, getElections, getElectionById } = require("../controllers/electionController");

router.post("/", createElection);
router.get("/", getElections);
router.get("/:id", getElectionById);

module.exports = router;
