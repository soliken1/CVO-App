import React from "react";
import Logo from "../assets/Logo.png";
const SplashScreen = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img className="w-52 h-52" src={Logo} />
    </div>
  );
};

export default SplashScreen;
