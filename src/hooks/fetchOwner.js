import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchOwner = async (ownerId) => {
  try {
    if (!ownerId) {
      throw new Error("Owner ID is required.");
    }

    const docRef = doc(db, "users", ownerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.warn("No Owner found with the given ID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Owner data:", error);
    return null;
  }
};

export default fetchOwner;
