const Job = require("../models/Job");

// ================= CREATE JOB =================
const createJob = async (req, res) => {
  try {
    const { title, description, company, salary } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      salary,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL JOBS =================
const getAllJobs = async (req, res) => {
  try {
    const { title, company, salary } = req.query;

    let filter = {};

    // filtering
    if (title) filter.title = new RegExp(title, "i");
    if (company) filter.company = new RegExp(company, "i");
    if (salary) filter.salary = { $gte: Number(salary) };

    const jobs = await Job.find(filter).populate("createdBy", "name email");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getAllJobs };