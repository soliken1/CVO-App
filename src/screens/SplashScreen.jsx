import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    
    const timeout = setTimeout(() => setFadeOut(true), 2500);
    
    const removeTimeout = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(removeTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        className="w-52 h-52 animate-pulse"
        src={Logo}
        alt="App Logo"
      />
    </div>
  );
};

export default SplashScreen;
