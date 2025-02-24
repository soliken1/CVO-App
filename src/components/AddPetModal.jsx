import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import fetchUser from "../hooks/fetchUser";
import { Timestamp } from "firebase/firestore";
import { MdOutlinePets } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const AddPetModal = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petBday, setPetBday] = useState("");
  const [petMarkings, setPetMarkings] = useState("");
  const [petImage, setPetImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!getUser?.uid) return;
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchAndSetUserData();
  }, [getUser?.uid]);

  const handleImageUpload = async () => {
    if (!petImage) {
      setMessage("Please select an image.");
      return null;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", petImage);
    formData.append("upload_preset", "profileimg");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwnawhcfm/image/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      setLoading(false);
      setMessage("Failed to upload image.");
      return null;
    }
  };

  const handleSavePet = async () => {
    if (!getUser?.uid || !petName || !petSpecies || !petBreed || !petBday) {
      setMessage("All fields are required.");
      return;
    }
    try {
      const imageUrl = await handleImageUpload();
      if (!imageUrl) return;
      const petBdayTimestamp = Timestamp.fromDate(new Date(petBday));
      await addDoc(collection(db, "pets"), {
        ownerId: getUser.uid,
        petName,
        petSpecies,
        petBreed,
        petBday: petBdayTimestamp,
        petMarkings,
        petImage: imageUrl,
      });
      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "addpet",
      });
      setMessage("Pet added successfully!");
      setTimeout(() => setShowModal(false), 2000);
      window.location.reload();
      setPetName("");
      setPetSpecies("");
      setPetBreed("");
      setPetBday("");
      setPetMarkings("");
      setImagePreview("");
      setPetImage(null);
    } catch (error) {
      setMessage("Failed to add pet.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed z-10 bottom-40 right-6 bg-[#050419] p-4 rounded-full shadow-lg hover:bg-[#22224e]"
      >
        <FaPlus className="text-white " />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center py-10 items-center z-50">
          <div className="bg-white p-6 rounded-md flex flex-col shadow-lg w-96 overflow-y-auto h-full pb-60">
            <h2 className="text-lg font-bold mb-4">Add a New Pet</h2>
            <div className="w-full flex flex-col items-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Pet Preview"
                  className="w-32 h-32 shadow-md rounded-full object-cover mb-2"
                />
              ) : (
                <MdOutlinePets className="w-32 h-32 shadow-md rounded-full border p-2 object-cover mb-2" />
              )}
              <input
                type="file"
                onChange={(e) => {
                  setPetImage(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <label className="font-bold mt-4">Pet Name</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <label className="font-bold mt-4">Species</label>
            <input
              type="text"
              value={petSpecies}
              onChange={(e) => setPetSpecies(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <label className="font-bold mt-4">Breed</label>
            <input
              type="text"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <label className="font-bold mt-4">Pet Birthday</label>
            <input
              type="date"
              value={petBday}
              onChange={(e) => setPetBday(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <label className="font-bold mt-4">Distinct Markings</label>
            <input
              type="text"
              value={petMarkings}
              onChange={(e) => setPetMarkings(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            {message && (
              <p className="text-green-400 text-sm mt-2">{message}</p>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSavePet}
                className="bg-[#050419] text-white px-4 py-2 rounded-md font-bold"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Pet"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 rounded-md font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPetModal;
