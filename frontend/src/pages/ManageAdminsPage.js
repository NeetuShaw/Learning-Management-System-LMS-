import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageAdminsPage.css";

const ManageAdminsPage = () => {
const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin", // Default role

  });

const fetchAdmins = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdmins(response.data);
  } catch (error) {
    console.error("Failed to fetch admins:", error);
  }
};

const addAdmin = async (e) => {
  e.preventDefault();

  console.log("Submitting Form Data:", formData); // Log formData before sending

  try {
    const token = localStorage.getItem("token");

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      console.error("Missing required fields");
      return;
    }

    const response = await axios.post(
      "http://localhost:5000/api/admin",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }, // Ensure proper structure
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Admin added successfully:", response.data);
    setFormData({ name: "", email: "", password: "", role: "Admin" }); // Reset form
    fetchAdmins(); // Refresh the admin list
  } catch (error) {
    console.error("Failed to add admin:", error.response ? error.response.data : error);
  }
};

const deleteAdmin = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAdmins();
  } catch (error) {
    console.error("Failed to delete admin:", error);
  }
};

useEffect(() => {
  fetchAdmins();
}, []);

  return (
    <div className="container">
      <header className="navbar">
        <h2 className="navbar-brand">Learning Management System (LMS)</h2>
      </header>
      <div className="heading">
        <h1>Manage Admins</h1>
       </div>
      <form onSubmit={addAdmin} className="add-admin-form">
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
         <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="Sub Admin">Sub Admin</option>
          <option value="User">User</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <div className="admin-list-section">
        <h2>All Users</h2>
        {admins.length === 0 ? (
          <p>No users found. Add a new user above.</p>
        ) : (
          <ul>
            {admins.map((admin) => (
              <li key={admin._id}>
                <span>{admin.name} - {admin.email} ({admin.role})</span>
                <button onClick={() => deleteAdmin(admin._id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageAdminsPage;
