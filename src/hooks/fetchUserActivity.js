import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchUserActivity = async () => {
  try {
    const collectionRef = collection(db, "activity");
    const snapshot = await getCountFromServer(collectionRef);

    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching users activity count:", error);
    return null;
  }
};

export default fetchUserActivity;
