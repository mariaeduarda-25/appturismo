import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
  },
  header: {
    backgroundColor: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInfo: {
    flexDirection: "column",
  },
  nome: {
    fontSize: 18,
    color: colors.black,
  },
  data: {
    fontSize: 12,
    color: colors.black,
  },
  icons: {
    flexDirection: "row",
    columnGap: 12, // se não funcionar, use marginHorizontal nos ícones
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  localizacao: {
    fontSize: 14,
    color: "gray",
  },
  imagem: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginTop: 8,
  },
  descricaoBox: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  descricao: {
    fontSize: 14,
    color: colors.black,
  },

  // --- NOVOS ESTILOS PARA O MODO DE EDIÇÃO ---
  inputEdit: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    color: colors.black,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 12,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  saveText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  // ---------------------------------------------

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: colors.secondary,
    borderTopWidth: 1,
    borderColor: colors.white,
  },
});

export default styles;
