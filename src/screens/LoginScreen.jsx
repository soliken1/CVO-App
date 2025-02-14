import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../configs/firebaseConfigs";
import { Link } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import Logo from "../assets/Logo.png";

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  });

  if (showSplash) {
    return <SplashScreen />;
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(null);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already in use");
      } else if (error.code === "auth/missing-password") {
        setErrorMessage("Password is Empty");
      } else if (error.code === "auth/missing-email") {
        setErrorMessage("Email is Empty");
      } else {
        setErrorMessage("Please Input Appropriate Fields");
      }
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5 duration-300">
      <div className="flex flex-col items-center gap-1">
        <img src={Logo} className="w-32 h-32" />
        <label className="text-2xl font-bold">Welcome!</label>
        <label className="text-lg font-semibold">
          Login to Access Your Account
        </label>
      </div>
      <div className="flex flex-col gap-5 w-2/3">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="border-[#050419] text-xs border rounded-lg p-2 placeholder:text-xs"
            placeholder="youremail@sample.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="border-[#050419] border rounded-lg p-2 text-xs placeholder:text-xs"
            placeholder="*****"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <label className="text-xs text-red-400">{errorMessage}</label>
        )}
        <button
          type="submit"
          className="bg-[#050419] py-2 rounded-lg text-white"
          onClick={login}
        >
          Login
        </button>
        <div className="flex flex-col items-center gap-3">
          <Link to="/forgotpassword" className="text-sm">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-sm">
            Create an Account
          </Link>
          <label className="text-[#050419] text-xs mt-5">Login as Guest</label>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
