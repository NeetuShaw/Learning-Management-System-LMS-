const User = require("../models/User");

// Add a new Admin or Sub Admin
const addAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate role input
    const allowedRoles = ["Admin", "Sub Admin", "User"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selection" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role, // Assign selected role
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all Admins
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

// Delete an Admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "Admin removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admin" });
  }
};

module.exports = { addAdmin, getAdmins, deleteAdmin };