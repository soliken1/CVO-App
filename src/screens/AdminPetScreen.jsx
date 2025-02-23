import React from "react";
import Ribbon from "../components/Ribbon";
import ChatComponent from "../components/ChatComponent";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import fetchUser from "../hooks/fetchUser";
import { db } from "../configs/firebaseConfigs";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const AdminPetScreen = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isloading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Fetch all users first and store their names in a dictionary
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        
        const usersMap = {};
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          usersMap[doc.id] = userData.name || "Unknown"; // Store UID as key and name as value
        });
    
        // Fetch all pets
        const petsCollection = collection(db, "pets");
        const petsSnapshot = await getDocs(petsCollection);
    
        const petsList = petsSnapshot.docs.map((petDoc) => {
          const petData = petDoc.data();
          return {
            id: petDoc.id,
            ...petData,
            ownerName: usersMap[petData.ownerId] || "Unknown", // Match UID to Name
          };
        });
    
        setPets(petsList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleFilterCycle = () => {
    const filterOptions = ["All", "Vaccinated", "Unvaccinated"];
    const currentIndex = filterOptions.indexOf(filter);
    const nextIndex = (currentIndex + 1) % filterOptions.length;
    setFilter(filterOptions[nextIndex]);
  };

  const filterByVaccination = (petList) => {
    switch (filter) {
      case "Vaccinated":
        return petList.filter((pet) => pet.isVaccinated === true);
      case "Unvaccinated":
        return petList.filter((pet) => pet.isVaccinated === false);
      case "All":
      default:
        return petList;
    }
  };

  const filterBySearch = (petList) => {
    if (!searchTerm) return petList;
  
    return petList.filter((pet) =>
      pet.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const displayedPets = () => {
    let filteredList = [...pets];
    filteredList = filterByVaccination(filteredList);
    filteredList = filterBySearch(filteredList);
    return filteredList;
  };

  const finalPets = displayedPets();

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 py-8 flex flex-col gap-5">
      <Ribbon userData={userData} />
      <div className="w-full flex flex-col items-end h-auto mt-5 gap-5">
        <div className="flex flex-row gap-2">
          {/* <button
            onClick={handleFilterCycle}
            className="px-2 min-w-16 h-8 cursor-pointer text-white rounded-lg text-xs bg-[#050419]"
          >
            {filter}
          </button> */}
          <input
            placeholder="Search Pets or Owner..."
            className="w-40 h-8 rounded-lg border-gray-400 border px-2 text-xs bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full h-full pb-60">
        {isloading ? (
          <div className="w-full h-96 animate-pulse rounded-lg duration-1000 bg-[#050419]"></div>
        ) : finalPets.length > 0 ? (
          finalPets.map((pet) => (
            <Link
              to={`/pet/${pet.id}`}
              key={pet.id}
              className="w-full h-20 flex items-center px-4 shadow-lg rounded-xl bg-white"
            >
              <img
                className="h-16 w-16 rounded-full object-cover border border-gray-300"
                src={pet.petImage}
                alt={pet.petName}
              />
              <div className="flex flex-col w-9/12 pl-3">
                <label className="text-sm font-bold">{pet.petName}</label>
                <label className="text-xs text-gray-400">{pet.petBreed}</label>
              </div>
            </Link>
          ))
        ) : (
          <label>No pets found matching your criteria</label>
        )}
      </div>
      <Navbar userData={userData} />
    </div>
  );
};

export default AdminPetScreen;
