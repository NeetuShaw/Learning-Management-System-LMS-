import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthBox from "./components/AuthBox";

// Pages
import DashboardPage from "./pages/DashboardPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SubAdminDashboard from "./pages/SubAdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AssignTaskPage from "./pages/AssignTaskPage";
import DepartmentProgress from "./pages/DepartmentProgress";
import ManageAdminsPage from "./pages/ManageAdminsPage";
import TrainingModulesPage from "./pages/TrainingModulesPage";
import ViewModulesPage from "./pages/ViewModulesPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

// Authentication Middleware for Protected Routes
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token"); 
  const role = localStorage.getItem("role"); 

  if (!token) {
    return <Navigate to="/" />; 
  }

  return allowedRoles && !allowedRoles.includes(role) ? <Navigate to="/dashboard" /> : element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthBox />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protect /dashboard so only logged-in users can access */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} allowedRoles={["Super Admin", "Admin", "Sub Admin", "User"]} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} allowedRoles={["Super Admin", "Admin", "Sub Admin", "User"]} />} />

        {/* Protected Routes */}
        <Route path="/super-admin" element={<ProtectedRoute element={<SuperAdminDashboard />} allowedRoles={["Super Admin"]} />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["Super Admin", "Admin"]} />}/>
        <Route path="/subadmin-dashboard" element={<ProtectedRoute element={<SubAdminDashboard />} allowedRoles={["Admin", "Super-Admin", "Sub Admin"]} />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["User"]} />} />
        <Route path="/assign-task" element={<ProtectedRoute element={<AssignTaskPage />} allowedRoles={["Admin"]} />} />
        <Route path="/department-progress" element={<ProtectedRoute element={<DepartmentProgress />} allowedRoles={["Admin"]} />} />
        <Route path="/manage-admins" element={<ProtectedRoute element={<ManageAdminsPage />} allowedRoles={["Super Admin", "Admin"]} />} />
        <Route path="/training-modules" element={<ProtectedRoute element={<TrainingModulesPage />} allowedRoles={["Admin", "Sub Admin"]} />} />
        <Route path="/view-modules" element={<ProtectedRoute element={<ViewModulesPage />} allowedRoles={["User", "Admin", "Sub Admin"]} />} />
        <Route path="/reports" element={<ProtectedRoute element={<ReportsPage />} allowedRoles={["Admin", "Super Admin"]} />} />
      </Routes>
    </Router>
  );
};

export default App;
