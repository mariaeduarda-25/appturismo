import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
  },

  headerBar: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.black,
  },

  blueBox: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    paddingBottom: 110,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  lilasBox: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: colors.black,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: colors.black,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationIcon: {
    marginRight: 8,
    color: colors.third,
  },
  locationText: {
    fontSize: 14,
    color: colors.third,
  },

  
  /* upload */
  uploadBox: {
    height: 120,
    borderWidth: 1,
    borderColor: colors.fourth,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  uploadText: {
    color: colors.third,
    fontWeight: "700",
  },

  /* botão salvar */
  saveButton: {
    backgroundColor: colors.third,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.primary,
    fontWeight: "700",
  },
});