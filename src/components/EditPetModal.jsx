import React, { useState } from "react";
import { db } from "../configs/firebaseConfigs";
import { doc, getDoc, updateDoc, Timestamp, addDoc, collection } from "firebase/firestore";


const EditPetModal = ({ petDocName, pet, onClose }) => {
  const [petName, setPetName] = useState(pet?.petName || "");
  const [petBreed, setPetBreed] = useState(pet?.petBreed || "");
  const [petSpecies, setPetSpecies] = useState(pet?.petSpecies || "");
  const [petBday, setPetBday] = useState(pet?.petBday ? new Date(pet.petBday).toISOString().split('T')[0] : "");
  const [petMarkings, setPetMarkings] = useState(pet?.petMarkings || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdatePet = async () => {
    if (!petDocName) {
      setMessage("Document name is missing.");
      return;
    }
  
    setLoading(true);
  
    const petRef = doc(db, "pets", petDocName);
  
    try {
      const docSnapshot = await getDoc(petRef);
  
      if (!docSnapshot.exists()) {
        setMessage("Pet document does not exist.");
        setLoading(false);
        return;
      }
  
      const formattedDate = new Date(petBday).toISOString().split('T')[0];
  
      await updateDoc(petRef, {
        petName,
        petBreed,
        petSpecies,
        petBday: formattedDate,
        petMarkings,
      });
  
      // Activity Logger
      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        activity: `Updated pet: ${petName}`,
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
  
  return (
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

        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleUpdatePet}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPetModal;
