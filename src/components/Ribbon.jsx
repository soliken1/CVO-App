import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Ribbon = ({ userData }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const displayUser = async () => {
      if (!userData) {
        setUsername("");
        return;
      }

      if (userData.username) {
        setUsername(userData.username);
        setisLoading(false);
      } else {
        setUsername(userData.tempUsername || "Guest");
        setisLoading(false);
      }
    };

    displayUser();
  }, [userData]);

  return (
    <div className="w-full h-12 flex justify-end">
      <div className="flex flex-row gap-4 items-center">
        {isLoading ? (
          <label className="w-28 h-4 rounded-full animate-pulse duration-300 bg-[#050419]"></label>
        ) : (
          <label className="font-semibold">{username}</label>
        )}
        <FaUserCircle className="h-10 w-10" />
      </div>
    </div>
  );
};

export default Ribbon;
