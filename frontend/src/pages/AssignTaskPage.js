import React, { useState } from "react";
import axios from "axios";
import "../styles/AssignTaskPage.css";

const AssignTaskPage = () => {
  const [task, setTask] = useState({
    assignedTo: "",
    taskTitle: "",
    taskDescription: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks/assign-task", {
        ...task,
        assignedBy: localStorage.getItem("role"),
        assignedTo: task.assignedTo,
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        deadline: task.deadline,
      });
      alert("Task assigned successfully!");
    } catch (error) {
      console.error("Error assigning task", error);
    }
  };

  return (
    <div className="assign-task-container">
         <header className="navbar">
        <h2 className="navbar-brand">Learning Management System (LMS)</h2>
      </header>
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <input name="assignedTo" placeholder="Assign to (User ID)" onChange={handleChange} required />
        <input name="taskTitle" placeholder="Task Title" onChange={handleChange} required />
        <textarea name="taskDescription" placeholder="Task Description" onChange={handleChange} required />
        <input type="date" name="deadline" onChange={handleChange} required />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTaskPage;
