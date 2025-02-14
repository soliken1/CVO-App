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
  const [isLoading, setIsLoading] = useState(true);
  const [getUser, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <>
            <Route
              path="/dashboard"
              element={<UserDashboard onLogout={handleLogout} />}
            />
            <Route
              path="/admindashboard"
              element={<AdminDashboard onLogout={handleLogout} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
