import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchPetCount = async () => {
  try {
    const collectionRef = collection(db, "pets");
    const snapshot = await getCountFromServer(collectionRef);

    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching pet count:", error);
    return null;
  }
};

export default fetchPetCount;
