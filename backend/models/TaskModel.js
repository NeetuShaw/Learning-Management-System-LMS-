const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  assignedBy: { type: String, required: true },
  assignedTo: { type: String, required: true },
  taskTitle: { type: String, required: true },
  taskDescription: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Task", TaskSchema);
