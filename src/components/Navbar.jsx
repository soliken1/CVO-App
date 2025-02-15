import React from "react";
import { CgHomeAlt } from "react-icons/cg";
import { MdOutlinePets } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 h-auto w-full">
      <div className="flex justify-evenly gap-1 items-center py-3 bg-[#050419] ">
        <Link
          to="/dashboard"
          className="flex flex-col items-center gap-1 w-[74px]"
        >
          <CgHomeAlt className="h-6 w-6 text-white" />
          <label className="text-sm text-white">Home</label>
        </Link>
        <Link to="/pets" className="flex flex-col items-center gap-1 w-[74px]">
          <MdOutlinePets className="h-6 w-6 text-white" />
          <label className="text-sm text-white">Pets</label>
        </Link>
        <Link
          to="/infochat"
          className="flex flex-col items-center gap-1 w-[74px]"
        >
          <MdOutlineInfo className="h-6 w-6 text-white" />
          <label className="text-sm text-white">Info</label>
        </Link>
        <Link
          to="/alerts"
          className="flex flex-col items-center gap-1 w-[74px]"
        >
          <IoIosNotifications className="h-6 w-6 text-white" />
          <label className="text-sm text-white">Alerts</label>
        </Link>
        <Link
          to="/settings"
          className="flex flex-col items-center gap-1 w-[74px]"
        >
          <IoSettingsSharp className="h-6 w-6 text-white" />
          <label className="text-sm text-white">Settings</label>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
