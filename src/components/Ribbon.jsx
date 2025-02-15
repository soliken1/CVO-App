import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Ribbon = () => {
  return (
    <div className="w-full h-12 flex justify-end">
      <div className="flex flex-row gap-4 items-center">
        <label className="font-semibold">Sample User</label>
        <FaUserCircle className="h-10 w-10" />
      </div>
    </div>
  );
};

export default Ribbon;
