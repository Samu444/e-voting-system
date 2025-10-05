const Election = require("../models/Election");

// Create election
exports.createElection = async (req, res) => {
  try {
    const { title, candidates, startTime, endTime } = req.body;

    const election = new Election({ title, candidates, startTime, endTime });
    await election.save();

    res.status(201).json({ message: "Election created successfully", election });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all elections
exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get election by ID
exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Election not found" });

    res.json(election);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
