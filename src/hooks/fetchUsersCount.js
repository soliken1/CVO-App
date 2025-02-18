import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchUsersCount = async () => {
  try {
    const collectionRef = collection(db, "users");
    const snapshot = await getCountFromServer(collectionRef);

    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching users count:", error);
    return null;
  }
};

export default fetchUsersCount;
