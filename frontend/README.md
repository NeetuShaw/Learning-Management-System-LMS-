# Learning Management System (LMS)


## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
3. [System Architecture](#System-architecture)
4. [Installation](#installation)
5. [Folder Structure](#Folder-Structure)
6. [Authentication](#Authentication)
7. [Routes](#routes)
8. [Role Assigned](#UserRoles-And-Permissions)
9. [How to Use](#usage)
10. [API Endpoints](#API-Endpoints)

-----

## Project Overview
The Learning Management System (LMS) is a web-based platform designed to facilitate online learning, training, and certification. It supports multiple user roles with distinct access levels, ensuring secure and efficient management of training modules, user progress, and certificates.

This system is particularly beneficial for organizations, educational institutions, and corporate training programs that require a structured approach to training and knowledge sharing.

## Features
- **User Authentication**: 
✅ Secure user authentication (Login & Registration) using JWT (JSON Web Tokens).
✅ Role-Based Access Control (RBAC) to restrict or grant permissions dynamically.
✅ Session Management for maintaining authentication states.
- **Dashboard for Users**: 
✅ Admin Dashboard: Manage users, track department progress, assign training modules, and generate reports.
✅ User Dashboard: View assigned training modules, track progress, and download certificates.
- **Training Modules**: 
✅ Module Management: Create, edit, and delete training courses.
✅ Progress Tracking: Users can track module completion.
✅ Certificate Generation: Users can download certificates after completing training.
- **Responsive UI**: User-friendly and adaptive layout for all devices.
- **Logout**: Secure logout functionality to remove tokens and session data.

## Technologies Used
- **Frontend**:
- React.js (with Hooks & Context API)
- React Router (for navigation)
- React Icons
- Axios (for HTTP requests)
- CSS (custom styling)

- **Backend**:
- Node.js (JavaScript runtime)
- Express.js (Fast backend framework)
- MongoDB (NoSQL database for storing user and module data)
- Mongoose (ODM for MongoDB)
- JWT (Authentication mechanism)
- Bcrypt.js (Password hashing for security)

## Installation
* Prerequisites:
- Node.js (LTS version recommended)
- MongoDB (or MongoDB Atlas for cloud database)

# Setup Instructions:
1. Clone the Repository
git clone https://github.com/NeetuShaw/Learning-Management-System-LMS-.git

2. Install Dependencies for Frontend and Backend:

* For Frontend (React):
- cd frontend
- npm install

* For Backend (Node.js):
- cd backend
- npm install

3. Configure Environment Variables:

* Create a .env file in the server directory and add the following:

- MONGO_URI=mongodb://localhost:27017/Full-Stack-Lms
- JWT_SECRET=6695b30ed695392136758f2fad8596f5463eb15afc3675e25ddf5174ee3768345261fa399818bceb4895b8aa2943ca2629cf0a646516c5339002b12f1f79767b


4. Run the Application:

# Start the Frontend:
- cd frontend
- npm start

# Start the Backend:
- cd backend
- node server.js

5. Access the Application
Open your browser and visit: http://localhost:3000

## Folder Structure

/LMS-Project
  ├── /frontend                  # Frontend React code
      ├── /src
          ├── /components       # Reusable components like Navbar, Sidebar, etc.
          ├── /pages           # Pages like UserDashboard, AdminDashboard, etc.
          ├── /styles          # CSS files
          └── App.js           # Main React component and routing setup
  ├── /backend                  # Backend Node.js code
      ├── /models              # MongoDB models (e.g., User, Module)
      ├── /routes              # API route files (e.g., /auth, /training)
      ├── /middleware          # Auth middleware and other custom middleware
      ├── /controllers         # Business logic for handling requests
      ├── /config              # Configuration files like database, server setup
      ├── /utils               # Utility functions for common tasks
      └── server.js            # Main server file

## Authentication
The application uses JWT (JSON Web Tokens) for secure authentication. When users log in, they receive a JWT token, which they must include in the Authorization header for subsequent requests. Tokens are stored in localStorage on the frontend.

## Authentication Flow:
1. User Logs In → Credentials are validated.
2. JWT Token Issued → User receives a JWT token.
3. Token Stored in Local Storage → Used for authentication in API requests.

## Routes
**Public Routes**:

- / - Login page (Authentication is required for other pages).
- /register - User registration.
**Protected Routes**:

- /dashboard - Main dashboard (Accessible to Super Admin, Admin, Sub Admin, User).
- /profile - User profile (Accessible to all logged-in users).
- /superadmin-dashboard - Super Admin dashboard (Accessible only to Super Admin).
- /admin-dashboard - Admin dashboard (Accessible to Admins).
- /subadmin-dashboard - Sub Admin dashboard (Accessible to Sub Admin).
- /user-dashboard - User dashboard (Accessible to User).
- /training-modules - Manage training modules (Accessible to Admin and Sub Admin).
- /view-modules - View training modules and progress (Accessible to all users).

# Role Assigned
**The LMS supports multiple roles**:

1. Super Admin:
- Can manage all users, roles, and perform administrative tasks.
Access to all pages.

2. Admin:
Can manage training modules, track user progress, and generate reports.
- Can assign tasks and view department progress.

3. Sub Admin:
- Limited administrative privileges (can manage training modules).
Cannot manage users or generate reports.

4. User:
- Can view and complete training modules, track their progress, and download certificates.

## How to Use
- Login / Register: Start by logging into the system using your credentials. If you don’t have an account, register as a new user.
- View Modules: As a User, you can view available training modules on the View Modules page. Track progress and download certificates after completing the modules.
- Admin Functions: Admins and Sub Admins can access the admin panel to manage users, training modules, and monitor progress.

## API Endpoints
1. Authentication Routes
- POST /api/auth/login - Log in and return JWT token.
- POST /api/auth/register - Register a new user.
- GET /api/auth/profile - Fetch user profile (requires authentication).

2. Training Module Routes
- GET /api/training - Fetch all training modules.
- GET /api/training/user-progress - Fetch user progress for all modules.
- GET /api/training/certificates - Fetch available certificates for a user.

3. Admin Routes (For Admins and Super Admins)
- POST /api/training - Create a new training module.
- PUT /api/training/:moduleId - Update a specific module.
- DELETE /api/training/:moduleId - Delete a training module.
