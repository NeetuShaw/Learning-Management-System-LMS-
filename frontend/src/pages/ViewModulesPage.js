import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewModulesPage.css";

const ViewModulesPage = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch modules
        const modulesResponse = await axios.get("http://localhost:5000/api/training", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(modulesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="view-modules-container">
      <header className="navbar">
        <h2 className="navbar-brand">Learning Management System (LMS)</h2>
      </header>
      <h1>View Saved Training Modules</h1>
      {modules.length === 0 ? (
        <p>No modules found. Add some in the Training Modules page.</p>
      ) : (
        <div className="modules-list">
          {modules.map((module) => {
            return (
              <div key={module._id} className="module-card">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <p>Type: {module.contentType}</p>

                {/* View Content Button */}
                {module.contentUrl && (
                  <a href={`http://localhost:5000${module.contentUrl}`} target="_blank" rel="noopener noreferrer">
                    View Content
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ViewModulesPage;
