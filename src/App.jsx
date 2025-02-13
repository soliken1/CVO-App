import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./configs/firebaseConfigs.js";
import Register from "./screens/RegisterScreen.jsx";
import Login from "./screens/LoginScreen.jsx";
import UserDashboard from "./screens/UserDashboard.jsx";
import AdminDashboard from "./screens/AdminDashboard.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
