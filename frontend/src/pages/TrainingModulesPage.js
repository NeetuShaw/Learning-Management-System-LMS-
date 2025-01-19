import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import "../styles/TrainingModulesPage.css";


const TrainingModulesPage = () => {
    const [formData, setFormData] = useState({ title: "", description: "", contentType: "" });
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
  
    const createModule = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
  
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("contentType", formData.contentType);
        data.append("contentFile", file);
  
        await axios.post("http://localhost:5000/api/training", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        setFormData({ title: "", description: "", contentType: "" });
        setFile(null);
        alert("Module added successfully!");
      } catch (error) {
        console.error("Failed to create module:", error);
      }
    };
  
    return (
      <div className="training-modules-container">
        <header className="navbar">
        <h2 className="navbar-brand">Learning Management System (LMS)</h2>
      </header>
      <h1>Add Training Module</h1>
        <form onSubmit={createModule} className="training-form">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
          <select
            value={formData.contentType}
            onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
            required
          >
            <option value="">Select Content Type</option>
            <option value="Video">Video</option>
            <option value="PDF">PDF</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf, .mp4"
            required
          />
          <button type="submit">Add Module</button>
        </form>
        <button
          className="view-modules-btn"
          onClick={() => navigate("/view-modules")}
        >
          View Saved Modules
        </button>
      </div>
    );
  };
  
  export default TrainingModulesPage;