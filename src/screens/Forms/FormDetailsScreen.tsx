import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { ButtonInterface } from "../../components/ButtonInterface"
import { useRoute } from "@react-navigation/native";
import { Form } from "../../navigations/FormsStackNavigation";

export function FormDetailsScreen({ navigation }: any) {
  const route = useRoute();
  const { form } = route.params as { form: Form };

  function handleDelete() {
    Alert.alert("Excluir", "Deseja excluir este formulário?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: () => {
          Alert.alert("Sucesso", "Formulário excluído com sucesso!");
          navigation.navigate("ListForms");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Formulário</Text>
      <Text>Título: {form.titulo}</Text>
      <Text>Descrição: {form.descricao}</Text>
      <Text>Data: {form.data}</Text>

      <ButtonInterface title="Editar" type="secondary" onPress={() => navigation.navigate("EditForm", { form })} />
      <ButtonInterface title="Excluir" type="primary" onPress={handleDelete} />
      <ButtonInterface title="Voltar" type="primary" onPress={() => navigation.navigate("ListForms")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
