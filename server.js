require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Job Tracker API is running...");
});

// Import Routes
const authRoutes = require("./routes/authRoutes");

// Use Routes
app.use("/api/auth", authRoutes);

// Job Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

// Password Routes
const passwordRoutes = require("./routes/passwordRoutes");
app.use("/api/password", passwordRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
