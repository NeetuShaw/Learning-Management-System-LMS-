const express = require("express");
const { getModules, createModule, deleteModule, getAnalytics  } = require("../controllers/trainingController");
const { protect } = require("../middleware/authMiddleware");
const { exportAnalytics, getUserProgress, getUserCertificates } = require("../controllers/trainingController");

const router = express.Router();
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames
    },
  });
  
  const upload = multer({ storage });
  

// Get all training modules
router.get("/", protect, getModules);

// Route for creating a training module
router.post("/", protect, upload.single("contentFile"), createModule);

// Delete a training module
router.delete("/:id", protect, deleteModule);

// Analytics route
router.get("/analytics", protect, getAnalytics);

// Add export route
router.get("/analytics/export", protect, exportAnalytics);

module.exports = router;
