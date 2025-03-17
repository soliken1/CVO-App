import React from "react";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/Navbar";
import fetchUser from "../hooks/fetchUser";
import { useState, useEffect } from "react";

const MicrochippedPetsScreen = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

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
      <div className="w-full flex items-end h-auto mt-5 justify-between">
        <label className="text-xl font-semibold font-roboto">
          Microchipped Pets
        </label>
        <div className="flex flex-row gap-5">
          <input
            placeholder="Search Pets or Owner..."
            className="w-40 h-8 rounded-lg border-gray-400 border px-2 text-xs bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full h-full pb-60">
        {/*Render All Microchipped Pets here as for clicking functions of specific pet display a modal passing values e.g props to a display modal and maybe a name of MicrochippedPetsModal*/}
      </div>
      <Navbar userData={userData} />
    </div>
  );
};

export default MicrochippedPetsScreen;
