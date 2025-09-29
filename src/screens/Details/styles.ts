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
    columnGap: 12, // se não funcionar no seu RN, troque por marginRight em cada botão
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
    height: 120,
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