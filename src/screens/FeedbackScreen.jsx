import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import SplashScreen from "./SplashScreen";
import fetchUser from "../hooks/fetchUser";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/Navbar";

const FeedbackScreen = ({ getUser }) => {
  const [userData, setUserData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await fetchUser(getUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const feedbackList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbacks(feedbackList);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetUserData();
    fetchFeedbacks();
  }, [getUser.uid]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-[#f8f4fc] w-screen h-auto overflow-y-auto relative px-6 py-8 flex flex-col">
      <Ribbon userData={userData} />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
              {/* Static Profile Image */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-gray-800 font-semibold">{feedback.uid}</p>
                  <span className="text-gray-500 text-xs">
                    {new Date(feedback.createdAt.toDate()).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Feedback Content */}
              <p className="text-gray-600 mt-3">{feedback.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full col-span-full">No feedback available.</p>
        )}
      </div>

      <Navbar userData={userData} />
    </div>
  );
};

export default FeedbackScreen;
