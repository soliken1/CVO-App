import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);

    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default fetchUsers;
