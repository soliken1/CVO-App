import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const handleMissingPet = async (petName, petBreed, petSpecies, ownerId, missingPets, setMissingPets) => {
  try {
    const userRef = collection(db, "users");
    const petRef = collection(db, "pets");
    const q = query(userRef, where("uid", "==", ownerId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const ownerData = querySnapshot.docs[0].data();
      const ownerName = ownerData.name || "Unknown Owner";

      console.log(`This pet "${petName}" is tagged as missing by ${ownerName} as of ${new Date().toLocaleDateString()}`);

      const isMissing = !missingPets[petName];

      // Toggle missing state
      setMissingPets((prevState) => ({
        ...prevState,
        [petName]: isMissing,
      }));

      const message = isMissing
        ? `${petName} is now tagged as missing!`
        : `${petName} is now untagged as missing!`;

      toast.success(message);

      // ✅ Update the petStatus field on Firestore
      const petQuery = query(petRef, where("ownerId", "==", ownerId), where("petName", "==", petName));
      const petSnapshot = await getDocs(petQuery);

      if (!petSnapshot.empty) {
        const petDocId = petSnapshot.docs[0].id;

        await updateDoc(doc(db, "pets", petDocId), {
          petStatus: isMissing ? "missing" : "n/a",
        });

        console.log(`✅ Pet status updated to ${isMissing ? "missing" : "n/a"}`);
      }

      // ✅ Send email if missing
      if (isMissing) {
        const templateParams = {
          to_email: "ajplaygamesxd@yahoo.com",
          to_name: "CVO Admin",
          message: `This pet "${petName}" a species of "${petSpecies}" and a breed of "${[petBreed]}"is tagged as missing by the owner ${ownerName} as of ${new Date().toLocaleDateString()}`,
        };

        await emailjs.send(
          "service_wmbofyj",  
          "template_i1hctq8", 
          templateParams,
          "OTKcxW7tWUSp9gqQH" 
        );

        console.log(`✅ Email successfully sent to ajplaygamesxd@yahoo.com`);
      }
    } else {
      console.error("Owner not found.");
    }
  } catch (error) {
    console.error("Error fetching owner data:", error);
  }
};

export default handleMissingPet;
