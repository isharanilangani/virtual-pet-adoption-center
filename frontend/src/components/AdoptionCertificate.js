import React from "react";
import { Document, Page, Text } from "@react-pdf/renderer";
import pdfStyles from "../styles/pdfStyles";

const AdoptionCertificate = ({ pet, adopter }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <Text style={pdfStyles.title}>Adoption Certificate</Text>
        <Text style={pdfStyles.text}>
          This certifies that <strong>{adopter}</strong> has adopted{" "}
          <strong>{pet.name}</strong>.
        </Text>
        <Text style={pdfStyles.text}>Species: {pet.species}</Text>
        <Text style={pdfStyles.text}>Personality: {pet.personality}</Text>
        <Text style={pdfStyles.text}>Date: {currentDate}</Text>
        <Text style={pdfStyles.footer}>
          Thank you for giving {pet.name} a loving home!
        </Text>
      </Page>
    </Document>
  );
};

export default AdoptionCertificate;
