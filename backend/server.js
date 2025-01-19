const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const taskRoutes= require("./routes/taskRoutes")

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Database connection failed:", err));

// Default Route
app.get("/", (req, res) => res.send("LMS Backend is running"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);

// Serve static files for training content & certificates
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Ensure this serves files correctly

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
