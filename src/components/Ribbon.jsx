import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { FaUserCircle } from "react-icons/fa";

const Ribbon = ({ userData }) => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const displayUser = async () => {
      if (!userData) {
        setName("");
        return;
      }

      if (userData.name) {
        setName(userData.name);
        setIsLoading(false);
      } else {
        setName(userData.tempName || "Guest");
        setIsLoading(false);
      }

      setProfile(userData.profileImage);
    };

    displayUser();
  }, [userData]);

  return (
    <div className="w-full h-12 flex justify-end">
      {/* Clickable Ribbon */}
      <div
        className="flex flex-row gap-4 justify-center items-center shadow-md rounded-full px-6 cursor-pointer hover:bg-gray-100 transition"
        onClick={() => navigate("/settings")} // Navigate on click
      >
        {isLoading ? (
          <>
            <label className="w-28 h-4 rounded-full animate-pulse duration-300 bg-[#050419]"></label>
            <div className="h-10 w-10 bg-[#050419] rounded-full"></div>
          </>
        ) : (
          <>
            <label className="font-semibold">{name}</label>
            {profile ? (
              <img src={profile} className="h-10 w-10 object-cover rounded-full" />
            ) : (
              <FaUserCircle className="h-10 w-10 text-gray-500" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Ribbon;
