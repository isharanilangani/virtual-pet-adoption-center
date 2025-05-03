import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  text: { fontSize: 14, marginBottom: 10 },
});

export default pdfStyles;
