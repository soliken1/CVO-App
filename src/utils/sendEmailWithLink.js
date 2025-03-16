import emailjs from "emailjs-com";

const sendEmailWithLink = async (ownerEmail, ownerName, downloadURL) => {
  const templateParams = {
    to_email: ownerEmail,
    to_name: ownerName,
    message: `Your pet's travel certificate is ready! 🐾 \n\nDownload here: ${downloadURL}`,
  };

  await emailjs.send(
    "service_wmbofyj", // EmailJS Service ID
    "template_i1hctq8", // EmailJS Template ID
    templateParams,
    "OTKcxW7tWUSp9gqQH" // Your EmailJS Public Key
  );
};

export default sendEmailWithLink;
