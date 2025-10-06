import express from 'express';
import { castVote, getVotes } from '../controllers/voteController.js';

const router = express.Router();

// Cast a vote
router.post('/', castVote);

// Get all votes (for admin or results)
router.get('/', getVotes);

export default router;
