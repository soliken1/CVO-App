import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

const fetchUserFeedback = async () => {
  try {
    // 1️⃣ Fetch all feedback
    const feedbackQuery = collection(db, "feedbacks");
    const feedbackSnapshot = await getDocs(feedbackQuery);

    let feedbackList = [];
    feedbackSnapshot.forEach((doc) => {
      feedbackList.push({ id: doc.id, ...doc.data() });
    });

    if (feedbackList.length === 0) return []; // No feedback found

    // 2️⃣ Extract unique user IDs from feedback
    const userIds = [...new Set(feedbackList.map((feedback) => feedback.uid))];

    // 3️⃣ Fetch users whose UID exists in feedback
    const usersQuery = query(
      collection(db, "users"),
      where("uid", "in", userIds)
    );
    const usersSnapshot = await getDocs(usersQuery);

    let userMap = {};
    usersSnapshot.forEach((doc) => {
      userMap[doc.data().uid] = doc.data(); // Store user data using uid as key
    });

    // 4️⃣ Merge user details into feedback
    const feedbackWithUser = feedbackList.map((feedback) => ({
      ...feedback,
      user: userMap[feedback.uid] || null, // Attach user data
    }));

    return feedbackWithUser;
  } catch (error) {
    console.error("Error fetching user feedback:", error);
    return [];
  }
};

export default fetchUserFeedback;
