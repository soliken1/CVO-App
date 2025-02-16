import React, { useState, useEffect } from "react";
import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfigs";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import fetchUser from "../hooks/fetchUser";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import Ribbon from "../components/Ribbon";
const SettingsScreen = ({ getUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAndSetUserData();
  }, [getUser.uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (!newPassword) {
        alert("Please enter a new password.");
        return;
      }

      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully.");
      window.location.reload();
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  const handleUsernameUpdate = async () => {
    try {
      if (!newUsername) {
        alert("Please enter a new username.");
        return;
      }

      const userDocRef = doc(db, "users", getUser.uid);

      await updateDoc(userDocRef, {
        username: newUsername,
        tempUsername: deleteField(),
      });

      alert("Username updated successfully.");
      window.location.reload();
      setNewUsername("");
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Failed to update username. Please try again.");
    }
  };

  const handleImageUpload = async () => {
    if (!newImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", newImage);
    formData.append("upload_preset", "profileimg");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwnawhcfm/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      const userDocRef = doc(db, "users", getUser.uid);
      await updateDoc(userDocRef, { profileImage: imageUrl });

      alert("Profile image updated successfully.");
      setImagePreview(imageUrl);
      setNewImage(null);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-y-auto relative px-6 py-8">
      <Ribbon userData={userData} />
      <div className="h-auto w-full flex flex-col gap-8">
        {/* Update Profile Image */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-auto flex items-center justify-center">
            <img
              src={imagePreview ? imagePreview : userData?.profileImage}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full shadow-sm shadow-black object-cover"
            />
          </div>
          <label className="font-bold">Change Profile Image</label>
          <div className="w-full h-auto flex flex-row gap-2">
            <input
              type="file"
              onChange={(e) => {
                setNewImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="border w-10/12 border-gray-300 p-2 rounded-md"
            />
            <button
              onClick={handleImageUpload}
              className="bg-[#050419] text-white  font-bold px-4 py-2 rounded-md"
            >
              ✓
            </button>
          </div>
        </div>

        {/* Update Username */}
        <div className="flex flex-col gap-4">
          <label className="font-bold">Change Username</label>
          <div className="w-full h-auto flex flex-row gap-2">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-300 w-10/12 p-2 rounded-md"
              placeholder={userData?.username}
            />
            <button
              onClick={handleUsernameUpdate}
              className="bg-[#050419] text-white font-bold px-4 py-2 rounded-md"
            >
              ✓
            </button>
          </div>
        </div>

        {/* Update Password */}
        <div className="flex flex-col gap-4">
          <label className="font-bold">Change Password</label>
          <div className="w-full h-auto flex flex-row gap-2 ">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-10/12"
              placeholder="Enter new password"
            />
            <button
              onClick={handlePasswordUpdate}
              className="bg-[#050419] text-white font-bold px-4 py-2 rounded-md"
            >
              ✓
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="h-12 bg-[#050419] mt-12 text-white font-bold rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed z-20 top-0 left-0 w-full h-full flex justify-center items-center duration-300 bg-[#050419] bg-opacity-25">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded-md font-bold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default SettingsScreen;
