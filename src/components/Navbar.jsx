import React from "react";
import { CgHomeAlt } from "react-icons/cg";
import { MdOutlinePets } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="absolute bottom-0 left-0 h-auto w-full">
      <div className="flex justify-evenly gap-1 items-center py-3 bg-[#050419] ">
        <div className="flex flex-col items-center gap-1 w-[74px]">
          <CgHomeAlt className="h-6 w-6 text-white" />
          <div className="text-sm text-white">Home</div>
        </div>
        <div className="flex flex-col items-center gap-1 w-[74px]">
          <MdOutlinePets className="h-6 w-6 text-white" />
          <div className="text-sm text-white">Pets</div>
        </div>
        <div className="flex flex-col items-center gap-1 w-[74px]">
          <IoIosNotifications className="h-6 w-6 text-white" />
          <div className="text-sm text-white">Notification</div>
        </div>
        <div className="flex flex-col items-center gap-1 w-[74px]">
          <IoSettingsSharp className="h-6 w-6 text-white" />
          <div className="text-sm text-white">Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
