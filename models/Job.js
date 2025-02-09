const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  jobLink: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  portalLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offer", "Rejected", "Pending"],
    default: "Applied",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);
