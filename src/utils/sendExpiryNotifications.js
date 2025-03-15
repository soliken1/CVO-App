import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";
import emailjs from "emailjs-com";

const sendExpiryNotifications = async () => {
  console.log("Checking for expiring vaccinations...");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const emailQuery = collection(db, "scheduledEmails");
    const emailDocs = await getDocs(emailQuery);

    console.log(`Retrieved ${emailDocs.size} scheduled emails.`);

    for (const docSnap of emailDocs.docs) {
      const data = docSnap.data();

      if (!data.expiryDate) {
        console.warn(`Skipping email for ${data.email}, missing expiryDate.`);
        continue;
      }

      const expiryDateUTC = new Date(data.expiryDate.toDate().toUTCString());
      expiryDateUTC.setHours(0, 0, 0, 0);

      if (expiryDateUTC.getTime() === tomorrow.getTime() && data.status === "pending") {
        console.log(`🚀 Sending email to ${data.email}`);

        const templateParams = {
          to_email: data.email,
          to_name: data.name,
          message: `Reminder: The vaccination (${data.vaccineType}) for ${data.petName} will expire tomorrow (${expiryDateUTC.toLocaleDateString()}). Please schedule a new vaccination.`,
        };

        try {
          await emailjs.send(
            "service_wmbofyj",
            "template_i1hctq8",
            templateParams,
            "OTKcxW7tWUSp9gqQH"
          );

          console.log(`✅ Email successfully sent to ${data.email}`);

          await updateDoc(doc(db, "scheduledEmails", docSnap.id), { status: "sent" });

        } catch (error) {
          console.error(`❌ Failed to send email to ${data.email}:`, error);
        }
      } else {
        console.log(`⏳ Not yet time to send email for ${data.email}`);
      }
    }
  } catch (error) {
    console.error("Error retrieving scheduled emails:", error);
  }
};

export default sendExpiryNotifications;
