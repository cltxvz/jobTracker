const express = require("express");
const auth = require("../middleware/auth");
const Job = require("../models/Job");

const router = express.Router();

// CREATE a new job application
router.post("/", auth, async (req, res) => {
  try {
    const { company, position, jobLink, username, password, portalLink, status } = req.body;
    const newJob = new Job({
      userId: req.user.id,
      company,
      position,
      jobLink,
      username,
      password,
      portalLink,
      status,
    });

    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// GET all jobs for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// UPDATE a job application
router.put("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// DELETE a job application
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Job.findByIdAndDelete(req.params.id)
    res.json({ msg: "Job removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
