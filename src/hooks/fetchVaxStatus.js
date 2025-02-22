import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchVaxStatus = async (petId) => {
  try {
    if (!petId) {
      throw new Error("Pet ID is required.");
    }

    const q = query(collection(db, "vaccinated"), where("petId", "==", petId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("No vaccination records found for this pet.");
      return [];
    }

    const vaxRecords = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return vaxRecords;
  } catch (error) {
    console.error("Error fetching vaccination records:", error);
    return [];
  }
};

export default fetchVaxStatus;
