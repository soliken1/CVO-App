import { pdf } from "@react-pdf/renderer";

const uploadPDFToCloudinary = async (petData, ownerData, GeneratePDF) => {
  const doc = <GeneratePDF petData={petData} ownerData={ownerData} />;
  const blob = await pdf(doc).toBlob();

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "pet_certificate");
  formData.append("folder", "pet_certificates");
  formData.append("resource_type", "raw");
  formData.append("public_id", `${petData.petName}_certificate.pdf`); 


  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dwnawhcfm/raw/upload", 
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log("Cloudinary Response:", data);
  return data.secure_url.replace('/raw/upload/', '/upload/fl_attachment:pdf/');
};

export default uploadPDFToCloudinary;
