const express = require("express");
const router = express.Router();
const { createElection, addCandidate, setElectionStatus } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/election", authMiddleware, roleMiddleware("admin"), createElection);
router.post("/candidate", authMiddleware, roleMiddleware("admin"), addCandidate);
router.patch("/election/status", authMiddleware, roleMiddleware("admin"), setElectionStatus);

module.exports = router;
