import Election from '../models/Election.js';

// Create a new election
export const createElection = async (req, res) => {
  try {
    const { title, description, candidates, startDate, endDate } = req.body;
    const election = await Election.create({
      title,
      description,
      candidates,
      startDate,
      endDate,
    });
    res.status(201).json({ message: 'Election created', election });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all elections
export const getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
