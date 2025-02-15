import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebaseConfigs";
import { useNavigate } from "react-router-dom";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import fetchUser from "../hooks/fetchUser";

const SettingsScreen = ({ getUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAndSetUserData();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen w-screen h-auto overflow-y-auto relative px-6 py-8">
      <Ribbon userData={userData} />

      <div className="h-96 w-full flex justify-center items-center">
        <button
          onClick={logout}
          className="w-32 h-12 bg-red-500 text-white font-bold rounded-md"
        >
          Logout
        </button>
      </div>

      <Navbar />
    </div>
  );
};

export default SettingsScreen;
