import React, { useState } from "react";
import { doc, deleteDoc, collection, Timestamp, addDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const EditDeletePetModal = ({ pet, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          <h2 className="text-lg font-bold mb-4">Pet Details</h2>

          <div className="mb-2">
            <label className="font-bold">Pet Name:</label>
            <p className="border p-2 rounded-md">{pet.petName}</p>
          </div>

          <div className="mb-2">
            <label className="font-bold">Species:</label>
            <p className="border p-2 rounded-md">{pet.petSpecies}</p>
          </div>

          <div className="mb-2">
            <label className="font-bold">Breed:</label>
            <p className="border p-2 rounded-md">{pet.petBreed}</p>
          </div>

          <p className="border p-2 rounded-md">
  {pet.petBday?.toDate ? pet.petBday.toDate().toLocaleDateString() : "N/A"}
</p>


          <div className="mb-4">
            <label className="font-bold">Distinct Markings:</label>
            <p className="border p-2 rounded-md">{pet.petMarkings}</p>
          </div>

          {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

          <div className="flex justify-between gap-5">
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
          petName={pet.petName}
          onConfirm={handleDeletePet}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default EditDeletePetModal;
