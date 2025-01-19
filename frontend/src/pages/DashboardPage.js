import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setError("");

        // Redirect based on role
        switch (response.data.role) {
          case "Super Admin":
            navigate("/super-admin");
            break;
          case "Admin":
            navigate("/admin-dashboard");
            break;
          case "Sub Admin":
            navigate("/subadmin-dashboard");
            break;
          case "User":
            navigate("/user-dashboard");
            break;
          default:
            navigate("/");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch user data.");
        setTimeout(() => {
          navigate("/"); // Redirect to login page after an error
        }, 3000);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderContent = () => {
    if (!userData) return <div>Loading...</div>;

    switch (userData.role) {
      case "Super Admin":
        return (
          <div className="card">
            <h3>Manage Admins</h3>
            <p>Add, remove, and view all admins.</p>
          </div>
        );
      case "Admin":
        return (
          <div className="card">
            <h3>Manage Training Modules</h3>
            <p>Create and assign training modules to departments.</p>
          </div>
        );
      case "Sub Admin":
        return (
          <div className="card">
            <h3>Manage Seafarer Enrollment</h3>
            <p>Oversee ship-specific training and progress tracking.</p>
          </div>
        );
      case "User":
        return (
          <div className="card">
            <h3>Your Training</h3>
            <p>Access assigned training and track your progress.</p>
          </div>
        );
      default:
        return <div>No content available for your role.</div>;
    }
  };

  
};

export default DashboardPage;
