import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Ribbon from "../components/Ribbon";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaFlag, FaArrowRight } from "react-icons/fa";
import fetchUser from "../hooks/fetchUser";
import ChatComponent from "../components/ChatComponent";
import AddPetModal from "../components/AddPetModal";
import { db } from "../configs/firebaseConfigs";
import { collection, query, where, getDocs } from "firebase/firestore";
import SplashScreen from "./SplashScreen";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import EditDeletePetModal from "../components/EditDeletePetModal";
import { IoMdLocate } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import handleMissingPet from "../utils/taggedMissingPets";



const UserDashboard = ({ getUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [missingPets, setMissingPets] = useState({});



  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser?.uid);
        if (data) {
          setUserData(data);
          if (data.userRole === "Admin") {
            navigate("/admindashboard");
          }
          setLoading(false);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserPets = async () => {
      if (!getUser?.uid) return;

      try {
        const petsRef = collection(db, "pets");
        const q = query(petsRef, where("ownerId", "==", getUser.uid));
        const querySnapshot = await getDocs(q);

        const petsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPets(petsList);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchAndSetUserData();
    fetchUserPets();
  }, [getUser?.uid]);

  if (loading) {
    return <SplashScreen />;
  }

  const openModal = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };



  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 py-8 flex flex-col gap-5">
                <Toaster position="bottom-center"/>
      <Ribbon userData={userData} />
      <ChatComponent />
      <WeatherWidget />
      <div className="w-full flex flex-col h-auto mt-5 gap-5">
        {/* Pets Section */}
        <div className="w-full h-auto flex flex-col gap-3">
          <label className="font-semibold text-xl">Your Pets</label>
          <div className="flex flex-col gap-2 h-auto w-full">
            {pets.length > 0 ? (
              pets.map((pet) => (
                <div key={pet.id} className="relative w-full">
                  <Link
                    to={`/pet/${pet.id}`}
                    className="w-full h-20 flex items-center px-4 shadow-lg rounded-xl bg-white"
                  >
                    <img
                      src={pet.petImage}
                      alt={pet.petName}
                      className="h-16 w-16 rounded-full object-cover border border-gray-300"
                    />
                    <div className="flex flex-col w-9/12 pl-3">
                      <label className="text-sm font-bold">{pet.petName}</label>
                      <label className="text-xs text-gray-400">
                        {pet.petBreed}
                      </label>
                    </div>
                  </Link>
                  <button
                    onClick={() => openModal(pet)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2"
                  >
                    <FaEllipsisV className="text-gray-500" />
                  </button>

                  <button
                      onClick={() => handleMissingPet(pet.petName, pet.ownerId, missingPets, setMissingPets)}
                    className={`absolute top-1/2 right-14 transform -translate-y-1/2 p-2 ${
                      missingPets[pet.petName] ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <IoMdLocate size={20} />
                  </button>

                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No pets found.</p>
            )}
            {showModal && (
              <EditDeletePetModal
                pet={selectedPet}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        </div>
      </div>

      {userData && <AddPetModal getUser={userData} />}
      <Navbar userData={userData} />
    </div>
  );
};

export default UserDashboard;
