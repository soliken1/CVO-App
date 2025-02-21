import React from "react";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import fetchUser from "../hooks/fetchUser";
import Ribbon from "../components/Ribbon";
import ChatComponent from "../components/ChatComponent";
import Navbar from "../components/Navbar";
const DigitalPetbookScreen = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAndSetUserData();
  }, [getUser.uid]);

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 py-8 flex flex-col gap-5">
      <Ribbon userData={userData} />
      <ChatComponent />
      <Navbar userData={userData} />
    </div>
  );
};

export default DigitalPetbookScreen;
