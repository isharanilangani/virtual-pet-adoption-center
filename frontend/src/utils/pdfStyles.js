import { StyleSheet } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#fdfcf8",
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
    color: "#4b5320",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    fontSize: 12,
    textAlign: "center",
    color: "#777",
  },
});

export default pdfStyles;
