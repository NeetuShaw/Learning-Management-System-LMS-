import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DepartmentProgress.css";

const DepartmentProgress = ({ department }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/department-progress/${department}`)
      .then((response) => setProgress(response.data));
  }, [department]);

  return (
    <div className="progress-container">
         <header className="navbar">
             <h2 className="navbar-brand">Learning Management System (LMS)</h2>
         </header>
      <h2>{department} Department Progress</h2>
      {progress ? (
        <div>
          <p>Total Tasks: {progress.totalTasks}</p>
          <p>Completed Tasks: {progress.completedTasks}</p>
          <p>Progress: {progress.progressPercentage}%</p>
        </div>
      ) : (
        <p>Loading progress...</p>
      )}
    </div>
  );
};

export default DepartmentProgress;
