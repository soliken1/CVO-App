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
import UserDashboard from "./screens/UserDashboardScreen.jsx";
import AdminDashboard from "./screens/AdminDashboardScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import DigitalPetbookScreen from "./screens/DigitalPetbookScreen.jsx";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen.jsx";
import AdminPetScreen from "./screens/AdminPetScreen.jsx";
import InfoScreen from "./screens/InfoScreen.jsx";
import FeedbackScreen from "./screens/FeedbackScreen.jsx";
import MicrochippedPetsScreen from "./screens/MicrochippedPetsScreen.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      window.history.replaceState(null, "", location.pathname);
    }
  }, [isLoggedIn, location]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />

        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        {isLoggedIn ? (
          <>
            <Route
              path="/dashboard"
              element={
                <UserDashboard getUser={getUser} onLogout={handleLogout} />
              }
            />

            <Route
              path="/pets"
              element={
                <AdminPetScreen getUser={getUser} onLogout={handleLogout} />
              }
            />

            <Route
              path="/pet/:petId"
              element={
                <DigitalPetbookScreen
                  getUser={getUser}
                  onLogout={handleLogout}
                />
              }
            />

            <Route
              path="/about"
              element={<InfoScreen getUser={getUser} onLogout={handleLogout} />}
            />

            <Route
              path="/feedbacks"
              element={
                <FeedbackScreen getUser={getUser} onLogout={handleLogout} />
              }
            />

            <Route
              path="/settings"
              element={
                <SettingsScreen getUser={getUser} onLogout={handleLogout} />
              }
            />

            <Route
              path="/microchipped"
              element={
                <MicrochippedPetsScreen
                  getUser={getUser}
                  onLogout={handleLogout}
                />
              }
            />

            <Route
              path="/admindashboard"
              element={
                <AdminDashboard getUser={getUser} onLogout={handleLogout} />
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
