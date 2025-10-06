import express from 'express';
import { createElection, getElections } from '../controllers/electionController.js';

const router = express.Router();

// Create a new election
router.post('/', createElection);

// Get all elections
router.get('/', getElections);

export default router;


