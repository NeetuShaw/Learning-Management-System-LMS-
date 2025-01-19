import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      {profile ? (
        <div className="profile-content">
          {/* Role-Specific Sections */}
          {profile.role === "Super Admin" && (
            <div className="super-admin-section">
              <h3>Super Admin Panel</h3>
            </div>
          )}

          {profile.role === "Admin" && (
            <div className="admin-section">
              <h3>Admin Dashboard</h3>
              <p>Manage users, monitor activities, and update settings.</p>
            </div>
          )}

          {profile.role === "Sub Admin" && (
            <div className="sub-admin-section">
              <h3>Sub Admin Access</h3>
              <p>Limited permissions to assist Admins in user management.</p>
            </div>
          )}

          {profile.role === "User" && (
            <div className="user-section">
              <h3>User Dashboard</h3>
              <p>Access to learning materials and personal data.</p>
            </div>
          )}

          {/* Profile Information Section */}
          <div className="profile-box">
  <h2>Profile</h2>
  <div className="profile-item">
    <strong>Name:</strong> <span>{profile.name}</span>
  </div>
  <div className="profile-item">
    <strong>Email:</strong> <span>{profile.email}</span>
  </div>
  <div className="profile-item">
    <strong>Role:</strong> <span>{profile.role}</span>
  </div>
</div>

        </div>
      ) : (
        <p className="loading">Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
