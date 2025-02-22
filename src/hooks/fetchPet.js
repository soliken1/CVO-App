import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchPetById = async (petId) => {
  try {
    if (!petId) {
      throw new Error("Pet ID is required.");
    }

    const docRef = doc(db, "pets", petId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Check if petBday is a Firestore Timestamp, then convert it to a readable date
      if (data.petBday && typeof data.petBday.toDate === "function") {
        data.petBday = data.petBday.toDate().toLocaleDateString("en-US");
      }

      return data;
    } else {
      console.warn("No pet found with the given ID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet data:", error);
    return null;
  }
};

export default fetchPetById;
