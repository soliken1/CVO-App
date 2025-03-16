import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "../assets/Logo.png"; // Your logo path here

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
  },
  officeName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  line: {
    borderBottom: "1px solid black",
    width: "100%",
    marginBottom: 8,
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 12,
  },
  signature: {
    marginTop: 20,
    textAlign: "center",
  },
  vetOfficer: {
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  office: {
    fontSize: 12,
  }
});

const GeneratePDF = ({ petData, ownerData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Office Name */}
      <View style={styles.header}>
        <Image src={Logo} style={styles.logo} />
        <Text style={styles.title}>Certificate of Travel Clearance</Text>
        <Text>Mandaue City Veterinary's Office</Text>
      </View>

      {/* Certificate Title */}
      <Text style={styles.title}>
        CERTIFICATE OF GOOD HEALTH FOR TRAVEL
      </Text>

      <Text>This is to certify that the pet described below has been examined and found to be in good health and fit for travel by land, air, and water.</Text>

      {/* Owner Information */}
      <View style={styles.section}>
        <Text style={styles.label}>Owner's Information:</Text>
        <Text>Name: {ownerData?.name || "Undefined"}</Text>
        <Text>Address: {ownerData?.address || "Undefined"}</Text>
        <Text>Contact Number: {ownerData?.mobileNumber || "Undefined"}</Text>
      </View>

      {/* Pet Information */}
      <View style={styles.section}>
        <Text style={styles.label}>Pet's Information:</Text>
        <Text>Name: {petData?.petName || "Undefined"}</Text>
        <Text>Species: {petData?.petSpecies || "Undefined"}</Text>
        <Text>Breed: {petData?.petBreed || "Undefined"}</Text>
        <Text>Birthdate: {petData.petBday instanceof Date
            ? petData.petBday.toLocaleDateString()
            : new Date(petData.petBday).toLocaleDateString() || "Undefined"}</Text>
         <Text>Markings: {petData?.petMarkings || "Undefined"}</Text>
      </View>
     {/* Footer */}
     <View style={styles.footer}>
        <Text>Date Issued: {new Date().toLocaleDateString()}</Text>
        <Text>Mandaue City Veterinary's Office</Text>
      </View>

      {/* Signature Section */}
      <View style={styles.signature}>
        <Text style={styles.vetOfficer}>Dr. Juan Dela Cruz</Text>
        <Text style={styles.office}>City Veterinarian</Text>
      </View>
    </Page>
  </Document>
);

export default GeneratePDF;
