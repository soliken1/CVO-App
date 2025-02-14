import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5 duration-300">
      <div className="flex flex-col items-center gap-1">
        <img src={Logo} className="w-32 h-32" />
        <label className="text-2xl font-bold">Welcome!</label>
        <label className="text-lg font-semibold">
          Login to Access Your Account
        </label>
      </div>
      <form className="flex flex-col gap-5 w-2/3">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="border-[#050419] text-xs py-1 border rounded-lg px-2 placeholder:text-xs"
            placeholder="youremail@sample.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="border-[#050419] border rounded-lg px-2 py-1 text-xs placeholder:text-xs"
            placeholder="*****"
          />
        </div>
        <button
          type="submit"
          className="bg-[#050419] py-2 rounded-lg text-white"
        >
          Login
        </button>
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="text-xs">
            Already Have an Account?{" "}
            <label className="underline">Login Here</label>
          </Link>
          <label className="text-[#050419] text-xs mt-5">Login as Guest</label>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
