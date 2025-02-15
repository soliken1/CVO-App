import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Ribbon from "../components/Ribbon";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import { MdOutlinePets } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import fetchUser from "../hooks/fetchUser";

const UserDashboard = ({ getUser }) => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: import.meta.env.VITE_OPEN_WEATHER_KEY,
    lat: "10.3157",
    lon: "123.8854",
    lang: "en",
    unit: "metric",
  });
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

  return (
    <div className="min-h-screen w-screen h-auto overflow-y-auto relative px-6 py-8">
      <Ribbon userData={userData} />
      <div className="w-full flex flex-col h-auto mt-5 gap-5">
        <div className="w-full h-40 rounded-lg bg-gradient-to-br from-[#141065] to-[#050419]">
          <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel="Cebu"
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
          />
        </div>
        <div className="w-full h-auto flex flex-col gap-3">
          <label className="font-semibold text-xl">Your Pets</label>
          <div className="flex flex-col gap-2 h-auto w-full">
            <Link className="w-full h-20 gap-5 flex items-center px-4 shadow-lg rounded-xl">
              <MdOutlinePets className="h-10 w-10" />
              <div className="flex flex-col w-9/12">
                <label className="text-xs">Luke</label>
                <label className="text-xs text-gray-400">Siamese Cat</label>
              </div>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default UserDashboard;
