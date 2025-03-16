import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../assets/Logo.png"; // Your logo path here
import { Timestamp } from "firebase/firestore";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    marginBottom: 2,
  },
  headerContent: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  officeName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  line: {
    borderBottom: "1px solid black",
    width: "100%",
    marginBottom: 8,
  },
  footer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    fontSize: 12,
  },
  footerContent: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
  },
  signature: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "justify",
    marginTop: 20,
  },
  vetOfficer: {
    fontSize: 14,
    fontWeight: "bold",
  },
  officerDetails: {
    width: "40%",
    display: "flex",
    gap: 1,
    flexDirection: "column",
  },
  office: {
    fontSize: 12,
  },
});

const GeneratePDF = ({ petData, ownerData, vaxRecords }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Office Name */}
      <View style={styles.header}>
        <Image src={Logo} style={styles.logo} />
        <View style={styles.headerContent}>
          <Text>Republic of the Philippines</Text>
          <Text>City of Mandaue</Text>
          <Text>City Veterinarian's Office</Text>
        </View>
      </View>

      <Text style={styles.title}>VETERINARY HEALTH CERTIFICATE</Text>

      {/* Subheader */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text>Control No: __________</Text>
          <Text>
            Date:{" "}
            <Text style={{ textDecoration: "underline" }}>
              {new Date().toLocaleDateString()}
            </Text>
          </Text>
          <Text>Time: __________</Text>
        </View>
      </View>

      {/* Certificate Title */}
      <Text style={styles.label}>TO WHOM IT MAY CONCERN:</Text>

      <Text>
        This is to certify that I have examined the dog/cat described below:
      </Text>

      {/* Owner Information */}
      <View style={styles.section}>
        <Text>
          Owned by:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {ownerData?.name || "___________"}
          </Text>
        </Text>
        <Text>
          Residing at:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {ownerData?.address || "___________"}
          </Text>
        </Text>
        <Text>
          Cellphone Number:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {ownerData?.mobileNumber || "___________"}
          </Text>
        </Text>
        <Text>
          Email:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {ownerData?.email || "___________"}
          </Text>
        </Text>
      </View>

      <Text>
        And to the best of my knowledge and ability to determine with the
        procedures used, find the dog/cat at the examination to be apparently
        free from evidence of dangerous communicable disease.
      </Text>

      {/* Pet Information */}
      <View style={styles.section}>
        <Text style={styles.label}>DESCRIPTION: </Text>
        <Text>
          Name of Pet:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {petData?.petName || "___________"}
          </Text>
        </Text>
        <Text>
          Species:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {petData?.petSpecies || "___________"}
          </Text>
        </Text>
        <Text>
          Breed:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {petData?.petBreed || "___________"}
          </Text>
        </Text>
        <Text>
          Color:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {petData?.petMarkings || "___________"}
          </Text>
        </Text>
        <Text>
          Date of Birth:{" "}
          <Text style={{ textDecoration: "underline" }}>
            {petData.petBday instanceof Date
              ? petData.petBday.toLocaleDateString()
              : new Date(petData.petBday).toLocaleDateString() || "___________"}
          </Text>
        </Text>
      </View>

      <Text>
        This further certifies that the above-described dog/cat was vaccinated
        against Rabies on{" "}
        <Text style={{ textDecoration: "underline" }}>
          {vaxRecords?.vaccineDate instanceof Timestamp
            ? vaxRecords?.vaccineDate.toDate().toLocaleDateString()
            : new Date(vaxRecords?.vaccineDate).toLocaleDateString()}
        </Text>
        (date) using{" "}
        <Text style={{ textDecoration: "underline" }}>
          {vaxRecords?.vaccineType}
        </Text>{" "}
        (brand name) with Serial / Lot Number _________.
      </Text>

      {/* Signature Section */}
      <View style={styles.signature}>
        <View style={styles.officerDetails}>
          <Text>______________________________</Text>
          <Text style={styles.bold}>CLYDE VINCENT A. EDERANGO, DVM</Text>
          <Text>PRC License Number: ________</Text>
          <Text>Expiry Date: ________</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default GeneratePDF;
