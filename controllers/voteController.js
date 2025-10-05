const Election = require("../models/Election");
const User = require("../models/User");

// Cast a vote
exports.castVote = async (req, res) => {
  try {
    const { electionId } = req.params;
    const { voterId, candidate } = req.body;

    const election = await Election.findById(electionId);
    if (!election) return res.status(404).json({ message: "Election not found" });

    const now = new Date();
    if (now < election.startTime || now > election.endTime) {
      return res.status(400).json({ message: "Election is not active" });
    }

    const voter = await User.findById(voterId);
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    if (voter.hasVoted) return res.status(400).json({ message: "Voter has already voted" });

    election.votes.push({ voterId, candidate });
    await election.save();

    voter.hasVoted = true;
    await voter.save();

    res.json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get results
exports.getResults = async (req, res) => {
  try {
    const { electionId } = req.params;
    const election = await Election.findById(electionId);
    if (!election) return res.status(404).json({ message: "Election not found" });

    const results = {};
    election.candidates.forEach(c => results[c] = 0);
    election.votes.forEach(v => results[v.candidate]++);

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
