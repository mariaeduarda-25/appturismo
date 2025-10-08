import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { ButtonInterface } from "../../components/ButtonInterface";
import { colors } from "../../styles/colors";
import { useIsFocused } from "@react-navigation/native";
import { Form, FormStackParamList } from "../../navigations/FormsStackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<FormStackParamList, "ListForms">;

const mockForms: Form[] = [
  { id: "1", titulo: "Formulário de Viagem", descricao: "Detalhes da viagem", data: "2025-10-05" },
  { id: "2", titulo: "Formulário de Cadastro", descricao: "Novo participante", data: "2025-10-06" },
];

export function ListFormsScreen({ navigation }: Props) {
  const [forms, setForms] = useState<Form[]>(mockForms);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    // Aqui futuramente você pode buscar da API
    setForms(mockForms);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ButtonInterface
        title="Novo Formulário"
        type="secondary"
        onPress={() => navigation.navigate("RegisterForm")}
      />

      <FlatList
        data={forms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.titulo}</Text>
            <ButtonInterface
              title="Detalhes"
              type="primary"
              onPress={() => navigation.navigate("FormDetails", { form: item })}
            />
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum formulário encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: colors.black },
});
