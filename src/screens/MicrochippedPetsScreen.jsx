import React, { useState, useEffect } from "react";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/Navbar";
import fetchUser from "../hooks/fetchUser";

const MicrochippedPetsScreen = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPets, setAllPets] = useState([]); // Store all pets
  const [filteredPets, setFilteredPets] = useState([]); // Filtered data
  const [loading, setLoading] = useState(false);

  // Fetch user data
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

  // Fetch all pets on component mount
  useEffect(() => {
    const fetchAllPets = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://cvoapp.vercel.app/api/pets");
        const data = await response.json();

        setAllPets(data);
        setFilteredPets(data); // Initially set to all pets
      } catch (error) {
        console.error("Error fetching pet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPets();
  }, []);

  // Filter pet data when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPets(allPets); // Show all pets when search is empty
    } else {
      const filtered = allPets.filter((pet) =>
        pet.microchip.includes(searchTerm.trim())
      );
      setFilteredPets(filtered);
    }
  }, [searchTerm, allPets]);

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 py-8 flex flex-col gap-5">
      <Ribbon userData={userData} />
      <div className="w-full flex items-end h-auto mt-5 justify-between">
        <label className="text-xl font-semibold font-roboto">
          Microchipped Pets
        </label>
        <div className="flex flex-row gap-5">
          <input
            placeholder="Search Microchip No."
            className="w-40 h-8 rounded-lg border-gray-400 border px-2 text-xs bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full h-full pb-60">
        {loading ? (
          <p>Loading...</p>
        ) : filteredPets.length > 0 ? (
          filteredPets.map((pet, index) => (
            <div key={index} className="border p-4 rounded-lg bg-white shadow-md">
            <p><strong>Microchip No:</strong> {pet.microchip || "No Data"}</p>
            <p><strong>Birth Date:</strong> {pet.birth_date || "No Data"}</p>
            <p><strong>Pet Name:</strong> {pet.pet_name || "No Data"}</p>
            <p><strong>Species:</strong> {pet.species || "No Data"}</p>
            <p><strong>Breed:</strong> {pet.breed || "No Data"}</p>
            <p><strong>Sex:</strong> {pet.sex || "No Data"}</p>
            <p><strong>Weight:</strong> {pet.weight || "No Data"}</p>
            <p><strong>Color:</strong> {pet.color || "No Data"}</p>
            <p><strong>Age:</strong> {pet.age || "No Data"}</p>
            <p><strong>Owner:</strong> {pet.owner || "No Data"}</p>
            <p><strong>Location:</strong> {pet.location || "No Data"}</p>
            <p><strong>Contact No:</strong> {pet.contact || "No Data"}</p>
            <p><strong>Email:</strong> {pet.email || "No Data"}</p>
            <p><strong>Rabies Vaccinated:</strong> {pet.vet || "No Data"}</p>
          </div>
          ))
        ) : (
          <p>No pet data found.</p>
        )}
      </div>
      <Navbar userData={userData} />
    </div>
  );
};

export default MicrochippedPetsScreen;
