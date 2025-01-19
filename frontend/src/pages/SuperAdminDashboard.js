import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SuperAdminDashboard.css";
import { FaBars, FaUsers, FaChartLine, FaUser, FaSignOutAlt, FaTachometerAlt, FaBook, FaSignInAlt } from "react-icons/fa";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role") || null;
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

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
      } catch (err) {
        setError(err.message || "Failed to fetch user data.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <header className="navbar">
        <h2 className="navbar-brand">Learning Management System (LMS)</h2>
      </header>
      <aside className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
        <ul className="sidebar-links">
          {token ? (
            <>
              {role === "Super Admin" && (
                <li>
                  <NavLink to="/manage-admins">
                    <FaUsers /> Manage Admins
                  </NavLink>
                </li>
              )}
              {(role === "Admin" || role === "Super Admin") && (
                <li>
                  <NavLink to="/reports">
                    <FaChartLine />System-Wide Reports
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile">
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/">
                <FaSignInAlt /> Login
              </NavLink>
            </li>
          )}
        </ul>
      </aside>

      <main>
        <div className="dashboard-header">
          <h1>Welcome, {userData?.name}!</h1>
          <p>Your role: {userData?.role}</p>
          <p> Manage overall system, add/remove admins, view system-wide reports</p>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
