import React, { useState } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const EditDeletePetModal = ({ pet, onClose }) => {
  const [petName, setPetName] = useState(pet.petName);
  const [petBreed, setPetBreed] = useState(pet.petBreed);
  const [petSpecies, setPetSpecies] = useState(pet.petSpecies);
  const [petBday, setPetBday] = useState(pet.petBday);
  const [petMarkings, setPetMarkings] = useState(pet.petMarkings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdatePet = async () => {
    setLoading(true);
    try {
      const petRef = doc(db, "pets", pet.id);
      await updateDoc(petRef, {
        petName,
        petBreed,
        petSpecies,
        petBday,
        petMarkings,
      });
      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "editpet",
      });
      setMessage("Pet updated successfully!");
      setTimeout(() => {
        setLoading(false);
        onClose();
        window.location.reload(); // Refresh data
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage("Failed to update pet.");
      setLoading(false);
    }
  };

  const handleDeletePet = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "pets", pet.id));
      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "deletepet",
      });
      setMessage("Pet deleted successfully!");
      setTimeout(() => {
        setLoading(false);
        onClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessage("Failed to delete pet.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md flex flex-col shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">Edit Pet Details</h2>
          <label className="font-bold">Pet Name</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="border p-2 rounded-md w-full"
          />

          <label className="font-bold mt-2">Species</label>
          <input
            type="text"
            value={petSpecies}
            onChange={(e) => setPetSpecies(e.target.value)}
            className="border p-2 rounded-md w-full"
          />

          <label className="font-bold mt-2">Breed</label>
          <input
            type="text"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            className="border p-2 rounded-md w-full"
          />

          <label className="font-bold mt-2">Birthday</label>
          <input
            type="date"
            value={petBday}
            onChange={(e) => setPetBday(e.target.value)}
            className="border p-2 rounded-md w-full"
          />

          <label className="font-bold mt-2">Distinct Markings</label>
          <input
            type="text"
            value={petMarkings}
            onChange={(e) => setPetMarkings(e.target.value)}
            className="border p-2 rounded-md w-full"
          />

          {message && <p className="text-green-400 text-sm mt-2">{message}</p>}

          <div className="flex justify-between mt-4 gap-5">
            <button
              onClick={handleUpdatePet}
              className="bg-blue-500 w-[120px] text-xs text-nowrap text-white px-4 py-2 rounded-md font-bold"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 w-[120px] text-xs text-nowrap text-white px-4 py-2 rounded-md font-bold"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Pet"}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 px-4 w-[120px] text-nowrap text-xs py-2 rounded-md font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmDeleteModal
          petName={petName}
          onConfirm={handleDeletePet}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default EditDeletePetModal;
