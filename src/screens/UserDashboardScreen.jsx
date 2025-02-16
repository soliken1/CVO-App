import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Ribbon from "../components/Ribbon";
import { MdOutlinePets } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import fetchUser from "../hooks/fetchUser";
import DateDisplay from "../components/DateDisplay";
import ChatComponent from "../components/ChatComponent";
const UserDashboard = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=10.3157&lon=123.8854&appid=${
            import.meta.env.VITE_OPEN_WEATHER_KEY
          }`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();

        const tempMinCelsius = (weatherData.main.temp_min - 273.15).toFixed(2);
        const tempMaxCelsius = (weatherData.main.temp_max - 273.15).toFixed(2);

        setWeatherData({
          ...weatherData,
          main: {
            ...weatherData.main,
            temp_min: tempMinCelsius,
            temp_max: tempMaxCelsius,
          },
        });
        console.log("Weather data:", weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchAndSetUserData();
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen w-screen h-auto overflow-y-auto relative px-6 py-8">
      <Ribbon userData={userData} />
      <ChatComponent />
      <div className="w-full flex flex-col h-auto mt-5 gap-5">
        <div className="w-full flex h-40 rounded-lg bg-gradient-to-br shadow-md shadow-black from-[#141065] to-[#050419]">
          <div className="w-8/12 flex flex-col gap-4 p-6 h-full">
            <div className="w-full flex flex-col gap-1 border-b border-gray-400 pb-2">
              <label className="text-white text-sm font-roboto">
                {weatherData?.name}
              </label>
              <DateDisplay />
            </div>
            <div className="w-full flex flex-col justify-center pb-2">
              <label className="text-white font-roboto text-lg">
                {(weatherData?.main.temp - 273.15).toFixed(0)} °C
              </label>
              <div className="flex flex-row gap-2 items-center">
                <img
                  className="w-6 h-6"
                  src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`}
                />
                <label className="text-xs text-gray-400">
                  {weatherData?.weather[0].main} /{" "}
                  {weatherData?.weather[0].description}
                </label>
              </div>
            </div>
          </div>
          <div className="w-4/12 h-full flex justify-center items-center rounded-lg">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            />
          </div>
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
