import React from "react";
import ChatComponent from "../components/ChatComponent";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import fetchUser from "../hooks/fetchUser";
const AdminDashboard = ({ getUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser?.uid);
        if (data) {
          setUserData(data);
          if (data.userRole === "Admin") {
          }
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchAndSetUserData();
  }, []);
  return (
    <div className="min-h-screen w-screen h-auto overflow-y-auto relative px-6 py-8">
      <Ribbon userData={userData} />
      <ChatComponent />
      <Navbar userData={userData} />
    </div>
  );
};

export default AdminDashboard;
