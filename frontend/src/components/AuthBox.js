import React, { useState } from "react";
import LoginForm from "../pages/LoginPage";
import RegisterForm from "../pages/RegisterPage";
import "../styles/AuthBox.css";

const AuthBox = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Fixed Title Bar */}
      <header className="title-bar">
        <h1>Learning Management System (LMS)</h1>
      </header>

      {/* Auth Box Content */}
      <main className="auth-box">
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => !isLogin && setIsLogin(true)}
            aria-label="Switch to Login Form"
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => isLogin && setIsLogin(false)}
            aria-label="Switch to Register Form"
          >
            Register
          </button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </main>
    </>
  );
};
export default AuthBox;
