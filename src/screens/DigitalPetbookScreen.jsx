import React from "react";
import { useState, useEffect } from "react";
import fetchUser from "../hooks/fetchUser";
import { useParams } from "react-router-dom";
import Ribbon from "../components/Ribbon";
import ChatComponent from "../components/ChatComponent";
import Navbar from "../components/Navbar";
import fetchPetById from "../hooks/fetchPet";
import { LuCakeSlice } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";
import AddVaccineStatusModal from "../components/AddVaccineStatusModal";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import fetchVaxStatus from "../hooks/fetchVaxStatus";
import fetchOwner from "../hooks/fetchOwner";

const DigitalPetbookScreen = ({ getUser }) => {
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaxRecords, setVaxRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerData, setOwnerData] = useState(null);
  const [userData, setUserData] = useState(null);

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
    const getPetData = async () => {
      const pet = await fetchPetById(petId);
      setPetData(pet);
    };

    if (petId) {
      getPetData();
    }
  }, [petId]);

  const handleAddVaccine = async (data) => {
    const vaxTimestamp = Timestamp.fromDate(new Date(data.vaccineDate));
    const expiryTimestamp = Timestamp.fromDate(new Date(data.expiryDate));
    if (!petId) {
      console.error("No pet ID found.");
      return;
    }

    try {
      await addDoc(collection(db, "vaccinated"), {
        petId,
        vaccineDate: vaxTimestamp,
        expiryDate: expiryTimestamp,
        vaccineType: data.vaccineType,
        createdAt: new Date(),
      });

      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "addvaccination",
      });

          
    await addDoc(collection(db, "scheduledEmails"), {
      email: ownerData.email,
      name: ownerData.name || "User",
      petName: petData.petName,
      vaccineType: data.vaccineType,
      expiryDate: expiryTimestamp,
      status: "pending",
    });
      

      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving vaccination data:", error);
    }
  };
  const filteredRecords = vaxRecords.filter((vax) =>
    vax.vaccineType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const getVaxData = async () => {
      const records = await fetchVaxStatus(petId);
      setVaxRecords(records);
    };

    if (petId) {
      getVaxData();
    }
  }, [petId]);

  useEffect(() => {
    const getOwnerData = async () => {
      if (!petData?.ownerId) return;
      const owner = await fetchOwner(petData.ownerId);
      setOwnerData(owner);
    };

    getOwnerData();
  }, [petData?.ownerId]);

  return (
    /*Parent Div*/
    <div className="h-screen w-screen flex flex-col items-center overflow-y-auto relative px-6 py-8">
      <Ribbon userData={userData} />
      {petData ? (
        /*The Petbook Section*/
        <div className="h-auto w-full flex flex-col gap-5 pb-60 mt-5">
          <img
            src={petData.petImage}
            className="object-cover w-full h-64 rounded-2xl"
          />

          <div className="flex flex-row items-center">
            <label className="font-bold font-roboto text-2xl px-4">
              {petData.petName}
            </label>

            {userData.userRole === "Admin" ? (
              <div className="flex flex-row gap-2 items-center">
                <label className="text-gray-500 text-xs">
                  Onwed by {ownerData?.name}
                </label>
                <img
                  className="w-6 h-6 rounded-full object-cover"
                  src={ownerData?.profileImage}
                  alt={ownerData?.name}
                />
              </div>
            ) : (
              <label></label>
            )}
          </div>

          <div className="flex flex-row gap-5">
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <LuCakeSlice className="h-full w-6" />
              <label className="font font-semibold text-sm font-roboto">
                Birthday
              </label>
            </div>
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <label className="font-roboto text-sm">
                {petData?.petBday?.toLocaleString()}
              </label>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <MdOutlinePets className="h-full w-6" />
              <label className="font font-semibold text-sm font-roboto">
                Pet Breed
              </label>
            </div>
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <label className="font-roboto text-sm">{petData.petBreed}</label>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <FaDog className="h-full w-6" />
              <label className="font font-semibold text-sm font-roboto">
                Pet Species
              </label>
            </div>
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <label className="font-roboto text-sm">
                {petData.petSpecies}
              </label>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <MdQuestionMark className="h-full w-6" />
              <label className="font font-semibold text-sm font-roboto">
                Pet Markings
              </label>
            </div>
            <div className="w-1/2 flex flex-row items-center h-8 gap-6">
              <label className="font-roboto text-sm">
                {petData.petMarkings}
              </label>
            </div>
          </div>
          {/*The End Petbook Section*/}
          {/*Vaccination Status Section*/}
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between gap-5">
              <label className="font-bold font-roboto text-2xl">
                Vaccination
              </label>
              <input
                type="text"
                placeholder="Search by vaccine type..."
                className="w-1/2 p-2 border rounded-md text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="">
              {filteredRecords.length > 0 ? (
                <div className="space-y-2">
                  {/* Table Header */}
                  <div className="flex justify-between font-bold text-gray-900 border-b pb-2">
                    <span className="w-1/3 text-left">Date</span>
                    <span className="w-1/3 text-left">Expiry</span>
                    <span className="w-1/3 text-left">Type</span>
                  </div>

                  {/* Vaccination Records */}
                  <ul className="space-y-2">
                    {filteredRecords.map((vax) => (
                      <li
                        key={vax.id}
                        className="flex justify-between border-b pb-2"
                      >
                        <span className="w-1/3 text-sm font-medium text-gray-700">
                        {vax.vaccineDate instanceof Timestamp 
                        ? vax.vaccineDate.toDate().toLocaleDateString() 
                        : new Date(vax.vaccineDate).toLocaleDateString()}
                        </span>
                        <span className="w-1/3 text-sm font-medium text-gray-700">
                        {vax.expiryDate instanceof Timestamp 
                         ? vax.expiryDate.toDate().toLocaleDateString() 
                        : new Date(vax.expiryDate).toLocaleDateString()}
                        </span>
                        <span className="w-1/3 text-sm font-semibold text-green-700">
                          {vax.vaccineType}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No vaccination records found.
                </p>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className=" px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Vaccination
            </button>
          </div>
        </div>
      ) : (
        /*The Petbook Loader Div*/
        <div className="h-48 mt-5 rounded-lg bg-gradient-to-br shadow-md shadow-black from-[#141065] to-[#050419] animate-pulse duration-1000"></div>
      )}
      <Navbar userData={userData} />

      {/* Modal */}
      <AddVaccineStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddVaccine}
      />
    </div>
  );
};

export default DigitalPetbookScreen;
