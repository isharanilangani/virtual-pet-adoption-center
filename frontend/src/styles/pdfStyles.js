import { StyleSheet } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#fdfcf8",
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    textDecoration: "underline",
    color: "#4b5320",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    color: "#333333",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    fontSize: 12,
    textAlign: "center",
    color: "#777777",
  },
});

export default pdfStyles;
