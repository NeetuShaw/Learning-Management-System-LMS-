const TrainingModule = require("../models/TrainingModule");
const { parse } = require("json2csv");

// Get all training modules
const getModules = async (req, res) => {
  try {
    const modules = await TrainingModule.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new training module
const createModule = async (req, res) => {
    console.log("Request Body:", req.body); // Log form fields
    console.log("Uploaded File:", req.file); // Log file information
  
    const { title, description, contentType } = req.body;
  
   // Validation: Check if all required fields are present
  if (!title || !description || !contentType || !req.file) {
    return res.status(400).json({ message: "All fields are required, including a file upload" });
  }
  
    try {
      const module = await TrainingModule.create({
        title,
        description,
        contentType,
        contentUrl: `/uploads/${req.file.filename}`, // Save file path
        createdBy: req.user.id,
      });
      res.status(201).json(module);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
// Delete a training module
const deleteModule = async (req, res) => {
  try {
    const module = await TrainingModule.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    await module.remove();
    res.json({ message: "Module removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch analytics for training modules
const getAnalytics = async (req, res) => {
    try {
      const totalModules = await TrainingModule.countDocuments();
      const contentTypeCount = await TrainingModule.aggregate([
        { $group: { _id: "$contentType", count: { $sum: 1 } } },
      ]);
      const recentModules = await TrainingModule.find().sort({ createdAt: -1 }).limit(5);
  
      res.json({
        totalModules,
        contentTypeCount,
        recentModules,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  };
  
// Export analytics as CSV
const exportAnalytics = async (req, res) => {
    try {
      const totalModules = await TrainingModule.countDocuments();
      const contentTypeCount = await TrainingModule.aggregate([
        { $group: { _id: "$contentType", count: { $sum: 1 } } },
      ]);
      const recentModules = await TrainingModule.find().sort({ createdAt: -1 }).limit(5);
  
      // Prepare data for CSV
      const csvData = {
        totalModules,
        contentTypeCount,
        recentModules,
      };
  
      const csv = parse(csvData, { fields: ["totalModules", "contentTypeCount", "recentModules"] });
      res.header("Content-Type", "text/csv");
      res.attachment("analytics-report.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: "Failed to export analytics" });
    }
  };

 module.exports = { getModules, createModule, deleteModule, getAnalytics, exportAnalytics };
  