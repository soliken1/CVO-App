import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Ribbon = ({ userData }) => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const displayUser = async () => {
      if (!userData) {
        setName("");
        return;
      }

      if (userData.name) {
        setName(userData.name);
        setisLoading(false);
      } else {
        setName(userData.tempName || "Guest");
        setisLoading(false);
      }

      setProfile(userData.profileImage);
    };

    displayUser();
  }, [userData]);

  return (
    <div className="w-full h-12 flex justify-end ">
      <div className="flex flex-row gap-4 justify-center items-center shadow-md rounded-full px-6">
        {isLoading ? (
          <>
            <label className="w-28 h-4 rounded-full animate-pulse duration-300 bg-[#050419]"></label>
            <img
              src={profile}
              className="h-10 w-10 bg-[#050419] rounded-full"
            />
          </>
        ) : (
          <>
            <label className="font-semibold">{name}</label>
            <img
              src={profile}
              className="h-10 w-10  object-cover rounded-full"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Ribbon;

//
