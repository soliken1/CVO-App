import React, { useEffect, useState } from "react";
import DateDisplay from "../components/DateDisplay";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  });

  return (
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
  );
};

export default WeatherWidget;
