import React, { useState } from "react";

const AddVaccineStatusModal = ({ isOpen, onClose, onSubmit }) => {
  const [vaccineDate, setVaccineDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [vaccineType, setVaccineType] = useState("");

  const handleSubmit = () => {
    if (!vaccineDate || !expiryDate || !vaccineType) {
      alert("Please fill out both fields.");
      return;
    }
    onSubmit({ vaccineDate, vaccineType, expiryDate });
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Vaccination Status</h2>

        {/* Date Input */}
        <label className="block mb-2 font-semibold">Vaccination Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={vaccineDate}
          onChange={(e) => setVaccineDate(e.target.value)}
        />

        {/* Date Input */}
        <label className="block mb-2 font-semibold">Expiration Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        {/* Vaccination Type Input */}
        <label className="block mb-2 font-semibold">Vaccination Type:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter vaccine type"
          value={vaccineType}
          onChange={(e) => setVaccineType(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVaccineStatusModal;
