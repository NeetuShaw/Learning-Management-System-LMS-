import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewModulesPage.css";

const ViewModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch modules
        const modulesResponse = await axios.get("http://localhost:5000/api/training", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(modulesResponse.data);

        // Fetch user progress
        const progressResponse = await axios.get("http://localhost:5000/api/training/user-progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(progressResponse.data);

        // Fetch user certificates
        const certificatesResponse = await axios.get("http://localhost:5000/api/training/certificates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCertificates(certificatesResponse.data);
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
            // Find progress for this module
            const userProgress = progress.find(p => p.moduleId === module._id);
            // Find certificate for this module
            const certificate = certificates.find(c => c.title === module.title);

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

                {/* Show Progress */}
                {userProgress ? (
                  <p>Progress: {userProgress.percentage}% {userProgress.completed ? "✅ Completed" : "⏳ In Progress"}</p>
                ) : (
                  <p>Progress: Not started</p>
                )}

                {/* Show Certificate Download Option */}
                {certificate ? (
                  <a href={`http://localhost:5000${certificate.certificateUrl}`} download className="download-certificate-btn">
                    Download Certificate
                  </a>
                ) : (
                  <p>No certificate available</p>
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
