const express = require("express");
const { addAdmin, getAdmins, deleteAdmin } = require("../controllers/adminController");
const { protect, isSuperAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", addAdmin); // Temporarily bypass middleware

router.get("/", protect, isSuperAdmin, getAdmins); // Get all admins
router.delete("/:id", protect, isSuperAdmin, deleteAdmin); // Delete admin

module.exports = router;
