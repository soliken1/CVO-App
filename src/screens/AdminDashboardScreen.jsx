import React from "react";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import fetchUser from "../hooks/fetchUser";
import WeatherWidget from "../components/WeatherWidget";
import { FaUsers } from "react-icons/fa6";
import fetchUsersCount from "../hooks/fetchUsersCount";
import fetchUserActivity from "../hooks/fetchUserActivity";
import { BsActivity } from "react-icons/bs";
import fetchPetCount from "../hooks/fetchPets";
import { MdOutlinePets } from "react-icons/md";
import { FaSyringe } from "react-icons/fa";
import getUniqueVaccinatedPetCount from "../hooks/fetchPetVaccinated";
import ActionAnalytics from "../components/ActionAnalytics";
const AdminDashboard = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [petCount, setPetCount] = useState(null);
  const [petVaccinated, setPetVaccinated] = useState(null);

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

    const getUserActivity = async () => {
      const userActivity = await fetchUserActivity();
      setUserActivity(userActivity);
    };

    const getCount = async () => {
      const userCount = await fetchUsersCount();
      setUsersCount(userCount);
    };

    const getPetCount = async () => {
      const totalPets = await fetchPetCount();
      setPetCount(totalPets);
    };

    const getVaccinated = async () => {
      const totalVaccinations = await getUniqueVaccinatedPetCount();
      setPetVaccinated(totalVaccinations);
    };

    getVaccinated();
    getCount();
    getPetCount();
    getUserActivity();
    fetchAndSetUserData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 pt-8 pb-32 flex flex-col gap-5">
      <Ribbon userData={userData} />
      <WeatherWidget />
      <div className="w-full h-auto flex flex-col justify-center gap-5 mt-5">
        <div className="w-full h-auto flex flex-row flex-nowrap gap-5 justify-center">
          <div className="w-[45%] h-32 bg-white shadow-md rounded-md flex flex-col gap-4 px-4 py-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="p-2 rounded-full shadow-xs shadow-gray-400">
                <FaUsers className="w-6 h-6  text-[#141065]" />
              </div>
              <label className="font-roboto font-medium text-sm text-gray-800">
                Total Users
              </label>
            </div>
            {usersCount !== null ? (
              <label className="font-roboto font-semibold text-3xl">
                {usersCount}
              </label>
            ) : (
              <div className="w-16 h-4 rounded-full bg-[#141065] animate-pulse duration-1000"></div>
            )}
          </div>

          <div className="w-[45%] h-32 bg-white shadow-md rounded-md flex flex-col gap-4 px-4 py-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="p-2 rounded-full shadow-xs shadow-gray-400">
                <BsActivity className="w-6 h-6  text-[#141065]" />
              </div>
              <label className="font-roboto font-medium text-sm text-gray-800">
                User Activities
              </label>
            </div>
            {userActivity !== null ? (
              <label className="font-roboto font-semibold text-3xl">
                {userActivity}
              </label>
            ) : (
              <div className="w-16 h-4 rounded-full bg-[#141065] animate-pulse duration-1000"></div>
            )}
          </div>
        </div>

        <div className="w-full h-auto flex flex-row flex-nowrap gap-5 justify-center">
          <div className="w-[45%] h-32 bg-white shadow-md rounded-md flex flex-col gap-4 px-4 py-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="p-2 rounded-full shadow-xs shadow-gray-400">
                <MdOutlinePets className="w-6 h-6  text-[#141065]" />
              </div>
              <label className="font-roboto font-medium text-sm text-gray-800">
                Pets Added
              </label>
            </div>
            {petCount !== null ? (
              <label className="font-roboto font-semibold text-3xl">
                {petCount}
              </label>
            ) : (
              <div className="w-16 h-4 rounded-full bg-[#141065] animate-pulse duration-1000"></div>
            )}
          </div>

          <div className="w-[45%] h-32 bg-white shadow-md rounded-md flex flex-col gap-4 px-4 py-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="p-2 rounded-full shadow-xs shadow-gray-400">
                <FaSyringe className="w-6 h-6  text-[#141065]" />
              </div>
              <label className="font-roboto font-medium text-sm text-gray-800">
                Pets Vaccinated
              </label>
            </div>
            {petVaccinated !== null ? (
              <label className="font-roboto font-semibold text-3xl">
                {petVaccinated}
              </label>
            ) : (
              <div className="w-16 h-4 rounded-full bg-[#141065] animate-pulse duration-1000"></div>
            )}
          </div>
        </div>
      </div>
      <ActionAnalytics />
      <Navbar userData={userData} />
    </div>
  );
};

export default AdminDashboard;
