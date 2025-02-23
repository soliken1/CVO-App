import React, { useState } from "react";
import { db } from "../configs/firebaseConfigs";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import ChatComponent from "../components/ChatComponent";

const InfoScreen = ({ getUser }) => {
  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setSuccessMessage("Please enter your feedback.");
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        uid: getUser.uid,
        name: getUser.name || "User",
        message: feedback,
        createdAt: new Date(),
      });

      setSuccessMessage("Thank you for your feedback!");
      setFeedback("");
    } catch (error) {
      console.error("Error saving feedback:", error);
      setSuccessMessage("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 py-8 flex flex-col gap-5">
      <Navbar userData={getUser} />
      <ChatComponent />

      {/* About Us Section */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-[#050419] mb-4">
          About Us
        </h1>
        <img
          src="https://via.placeholder.com/600x300" // Placeholder Image
          alt="About Us"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum tortor sem, in semper velit ultricies nec. Praesent
          tincidunt ex in erat varius, a vestibulum ipsum vestibulum. Vivamus
          non nunc id arcu suscipit tempor. Donec a lorem vel ligula laoreet
          venenatis eget nec nulla. Integer accumsan felis in erat posuere
          interdum. Proin vel enim nec turpis viverra tristique. Duis
          sollicitudin ullamcorper nisi, id bibendum felis lacinia in.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-[#050419] mb-4">
          Send Us Your Feedback
        </h2>
        {successMessage && (
          <p className="text-green-600 mb-2">{successMessage}</p>
        )}
        <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#050419] text-white py-2 px-4 rounded-lg hover:bg-[#27235f] transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoScreen;
