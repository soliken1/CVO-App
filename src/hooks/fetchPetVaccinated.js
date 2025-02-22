import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const getUniqueVaccinatedPetCount = async () => {
  try {
    const vaxCollection = collection(db, "vaccinated");
    const vaxSnapshot = await getDocs(vaxCollection);

    const uniquePets = new Set();
    const today = new Date().toISOString().split("T")[0];

    vaxSnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.expiryDate && data.expiryDate >= today) {
        uniquePets.add(data.petId);
      }
    });

    return uniquePets.size;
  } catch (error) {
    console.error("Error fetching vaccination data:", error);
    return 0;
  }
};

export default getUniqueVaccinatedPetCount;
