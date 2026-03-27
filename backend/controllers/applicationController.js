const Application = require("../models/Application");

// ================= APPLY JOB =================
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL APPLICATIONS (RECRUITER) =================
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company salary")
      .populate("applicant", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE APPLICATION STATUS =================
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;

    await application.save();

    res.json({
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyJob, getApplications, updateStatus };