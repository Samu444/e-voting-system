import Vote from '../models/Vote.js';

// Cast a vote
export const castVote = async (req, res) => {
  try {
    const { electionId, voterId, candidateId } = req.body;
    
    // Optional: Add logic to prevent double voting here

    const vote = await Vote.create({ electionId, voterId, candidateId });
    res.status(201).json({ message: 'Vote cast successfully', vote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all votes (for admin or results)
export const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
