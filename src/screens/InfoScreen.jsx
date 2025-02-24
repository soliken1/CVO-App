import React, { useState, useEffect } from "react";
import { db } from "../configs/firebaseConfigs";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Navbar from "../components/Navbar";
import ChatComponent from "../components/ChatComponent";
import Ribbon from "../components/Ribbon";
import fetchUser from "../hooks/fetchUser";
import AboutUs from "../assets/AboutUs.jpg";
const InfoScreen = ({ getUser }) => {
  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser?.uid);
        if (data) {
          setUserData(data);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchAndSetUserData();
  }, []);

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

      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "feedback",
      });

      setSuccessMessage("Thank you for your feedback!");
      setFeedback("");
    } catch (error) {
      console.error("Error saving feedback:", error);
      setSuccessMessage("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative p-4 pb-60 flex flex-col gap-5">
      <Ribbon userData={userData} />
      <ChatComponent />

      {/* About Us Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-3xl font-bold text-center text-[#050419] mb-4">
          About Us
        </h1>
        <img
          src={AboutUs}
          alt="About Us"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 text-lg leading-relaxed">
          The Mandaue Veterinary Office is committed to promoting animal health,
          welfare, and public safety across Mandaue City. As a trusted
          government institution, we provide a wide range of veterinary
          services, including pet vaccinations, disease control, and livestock
          health management. We advocate for responsible pet ownership through
          education on proper care, spaying and neutering, and ethical
          treatment. Additionally, we enforce animal welfare laws and city
          ordinances to prevent cruelty and humanely manage stray populations.
          By fostering community engagement and collaborating with stakeholders,
          organizations, and residents, we strive to create a compassionate,
          animal-friendly, and healthy environment for Mandaue City.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-[#050419] mb-4">
          Send Us Your Feedback
        </h2>
        {successMessage && (
          <p className="text-green-600 mb-2">{successMessage}</p>
        )}
        <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
          <textarea
            className="w-full border border-gray-300 min-h-20 p-2 overflow-y-auto max-h-32 h-auto rounded-lg text-sm"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#050419] text-whiterounded-lg px-4 py-2 text-white rounded-xl hover:bg-[#27235f] transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
      <Navbar userData={getUser} />
    </div>
  );
};

export default InfoScreen;
