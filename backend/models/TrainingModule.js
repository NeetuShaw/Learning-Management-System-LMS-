const mongoose = require("mongoose");

const trainingModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contentType: { type: String, required: true },
  contentUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  certificateUrl: { type: String }, // Add this field for certificates
});

module.exports = mongoose.model("TrainingModule", trainingModuleSchema);
