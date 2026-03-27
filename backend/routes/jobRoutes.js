const express = require("express");
const router = express.Router();

const { createJob, getAllJobs } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// GET ALL JOBS
router.get("/", getAllJobs);

// CREATE JOB
router.post("/", protect, createJob);

module.exports = router;