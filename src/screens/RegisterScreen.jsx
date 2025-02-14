import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../configs/firebaseConfigs.js";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setErrorMessage(null);
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("Email already in use");
      } else if (err.code === "auth/missing-password") {
        setErrorMessage("Password is Empty");
      } else if (err.code === "auth/missing-email") {
        setErrorMessage("Email is Empty");
      } else {
        setErrorMessage("Please Input Appropriate Fields");
      }
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5 duration-300">
      <div className="flex flex-col items-center gap-1">
        <img src={Logo} className="w-32 h-32" />
        <label className="text-2xl font-bold">Welcome!</label>
        <label className="text-lg font-semibold">Sign Up for an Account</label>
      </div>
      <div className="flex flex-col gap-5 w-2/3">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="border-[#050419] text-xs p-2 border rounded-lg placeholder:text-xs"
            placeholder="youremail@sample.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="border-[#050419] border rounded-lg p-2  text-xs placeholder:text-xs"
            placeholder="*****"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Confirm Password</label>
          <input
            type="password"
            className="border-[#050419] border rounded-lg p-2  text-xs placeholder:text-xs"
            placeholder="*****"
          />
        </div>
        {errorMessage && (
          <label className="text-xs text-red-400">{errorMessage}</label>
        )}
        <button
          type="submit"
          className="bg-[#050419] py-2 rounded-lg text-white"
          onClick={register}
        >
          Register
        </button>
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="text-xs">
            Already Have an Account?{" "}
            <label className="underline">Login Here</label>
          </Link>
          <label className="text-[#050419] text-xs mt-5">Login as Guest</label>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
