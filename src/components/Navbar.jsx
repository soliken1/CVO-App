import React, { useState, useEffect } from "react";
import { CgHomeAlt } from "react-icons/cg";
import { MdOutlinePets } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = ({ userData }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 h-18 w-full flex justify-evenly gap-1 items-center bg-[#050419]">
        <div className="flex flex-col items-center gap-2 w-[74px]">
          <div className="h-4 w-4 rounded-full bg-[#0d0a41] animate-pulse duration-1000"></div>
          <div className="h-2 w-12 rounded-full bg-[#0d0a41] animate-pulse duration-1000"></div>
        </div>
        <div className="flex flex-col items-center gap-2 w-[74px]">
          <div className="h-4 w-4 bg-[#0d0a41] rounded-full animate-pulse duration-1000"></div>
          <div className="h-2 w-12 rounded-full bg-[#0d0a41] animate-pulse duration-1000"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 h-auto w-full">
      <div className="flex justify-evenly gap-1 items-center py-3 bg-[#050419] ">
        {userData?.userRole === "Admin" ? (
          <Link
            to="/admindashboard"
            className="flex flex-col items-center gap-1 w-[74px]"
          >
            <CgHomeAlt className="h-6 w-6 text-white" />
            <label className="text-sm text-white">Home</label>
          </Link>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="flex flex-col items-center gap-1 w-[74px]"
            >
              <CgHomeAlt className="h-6 w-6 text-white" />
              <label className="text-sm text-white">Home</label>
            </Link>
            <Link
              to="/pets"
              className="flex flex-col items-center gap-1 w-[74px]"
            >
              <MdOutlinePets className="h-6 w-6 text-white" />
              <label className="text-sm text-white">Pets</label>
            </Link>
          </>
        )}

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
