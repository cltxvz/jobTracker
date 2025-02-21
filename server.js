require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/password", passwordRoutes);

// Serve React Frontend in Production
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build folder
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Serve React frontend for any unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Job Tracker API is running...");
  });
}

// Dummy route to wake up server
app.get("/api/wakeup", (req, res) => {
  res.status(200).send("Backend is awake!");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
