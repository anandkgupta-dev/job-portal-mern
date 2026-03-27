const express = require("express");
const router = express.Router();

const {
  applyJob,
  getApplications,
  updateStatus,
} = require("../controllers/applicationController");

const {
  protect,
  isJobSeeker,
  isRecruiter,
} = require("../middleware/authMiddleware");

// Apply (Job Seeker)
router.post("/apply", protect, isJobSeeker, applyJob);

// Get all applications (Recruiter)
router.get("/", protect, isRecruiter, getApplications);

// Update status (Recruiter)
router.put("/:id/status", protect, isRecruiter, updateStatus);

module.exports = router;