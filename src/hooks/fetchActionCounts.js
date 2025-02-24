import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const fetchActionCounts = async () => {
  try {
    const actionCollection = collection(db, "activity"); // Change to your collection name
    const actionSnapshot = await getDocs(actionCollection);

    const actionData = {};

    actionSnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.accessDate && data.accessDate.seconds && data.action) {
        // Convert Firestore Timestamp to 'YYYY-MM-DD' format
        const date = new Date(data.accessDate.seconds * 1000)
          .toISOString()
          .split("T")[0];

        if (!actionData[date]) {
          actionData[date] = {};
        }

        // Count each action per date
        if (!actionData[date][data.action]) {
          actionData[date][data.action] = 0;
        }
        actionData[date][data.action]++;
      }
    });
    console.log(actionData);
    return actionData; // { "2025-02-21": { "addpet": 3, "deletepet": 2 }, "2025-02-22": { "addpet": 5 } }
  } catch (error) {
    console.error("Error fetching actions:", error);
    return {};
  }
};

export default fetchActionCounts;
