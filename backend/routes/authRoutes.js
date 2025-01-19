const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Register User Endpoint
router.post("/register", registerUser);

// Login User Endpoint
router.post("/login", loginUser);


// Access User Profile Endpoint (Protected)
router.get("/profile", protect, getUserProfile);

module.exports = router;
