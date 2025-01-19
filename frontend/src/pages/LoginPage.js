import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Clear local storage and state on component mount
  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setEmail(""); // Reset email state
    setPassword(""); // Reset password state
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      // Save token & role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
  navigate("/dashboard");

  alert(`Welcome, ${response.data.name}!`);
  setError("");
} catch (err) {
  setError(err.response?.data?.message || "Something went wrong");
}
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-email" // Unique autocomplete for email
              name="new-email" // Unique name
              id="new-email" // Unique id
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password" // Specific for password field
              name="new-password" // Unique name
              id="new-password" // Unique id
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <p className="register-link">
      Don't have an account? <span onClick={() => navigate("/register")} className="register-link-text">Register here</span>
    </p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
