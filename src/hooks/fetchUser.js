import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchUser = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default fetchUser;
