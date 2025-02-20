import React from "react";

const ConfirmDeleteModal = ({ onConfirm, onCancel, petName }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h2 className="text-lg font-bold text-center">Confirm Deletion</h2>
        <p className="text-center mt-2 text-gray-600">
          Are you sure you want to delete <strong>{petName}</strong>?
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-bold"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 px-4 py-2 rounded-md font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
