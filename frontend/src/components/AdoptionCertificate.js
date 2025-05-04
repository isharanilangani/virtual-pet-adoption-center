import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import pdfStyles from '../utils/pdfStyles';

const AdoptionCertificate = ({ pet, adopter }) => (
  <Document>
    <Page style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Adoption Certificate</Text>
      <Text style={pdfStyles.text}>This certifies that {adopter} has adopted {pet.name}.</Text>
      <Text style={pdfStyles.text}>Species: {pet.species}</Text>
      <Text style={pdfStyles.text}>Personality: {pet.personality}</Text>
      <Text style={pdfStyles.text}>Date: {new Date().toLocaleDateString()}</Text>
      <Text style={pdfStyles.footer}>Thank you for giving {pet.name} a loving home!</Text>
    </Page>
  </Document>
);

export default AdoptionCertificate;
