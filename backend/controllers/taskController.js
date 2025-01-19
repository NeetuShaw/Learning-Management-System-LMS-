const Task = require("../models/TaskModel");

// Assign Task
const assignTask = async (req, res) => {
  try {
    const { assignedBy, assignedTo, taskTitle, taskDescription, deadline } = req.body;
    
    const newTask = new Task({
      assignedBy,
      assignedTo,
      taskTitle,
      taskDescription,
      deadline,
      status: "Pending",
    });

    await newTask.save();
    res.status(201).json({ message: "Task assigned successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error assigning task" });
  }
};

const getDepartmentProgress = async (req, res) => {
    const { department } = req.params;
  
    try {
      const tasks = await Task.find({ department });
      const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  
      res.json({
        department,
        totalTasks: tasks.length,
        completedTasks,
        progressPercentage: ((completedTasks / tasks.length) * 100).toFixed(2),
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching progress" });
    }
  };
  module.exports = { assignTask, getDepartmentProgress };
