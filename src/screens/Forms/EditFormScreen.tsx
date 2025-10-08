import React, { useState } from "react";
import { View, Text, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { styles } from "../Register/styles";
import { colors } from "../../styles/colors";
import { ButtonInterface } from "../../components/ButtonInterface";
import { useRoute } from "@react-navigation/native";
import { FormStackParamList } from "../../navigations/FormsStackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = NativeStackScreenProps<FormStackParamList, "EditForm">;

export function EditFormScreen({ navigation }: Props) {
  const route = useRoute();
  const { form } = route.params as { form: any };

  const [titulo, setTitulo] = useState(form.titulo);
  const [descricao, setDescricao] = useState(form.descricao);
  const [data, setData] = useState<Date>(new Date(form.data));
  const [showPicker, setShowPicker] = useState(false);

  function handleUpdate() {
    Alert.alert("Sucesso", "Formulário atualizado!");
    navigation.navigate("ListForms");
  }

  function handleDateChange(event: any, selectedDate?: Date) {
    setShowPicker(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <Text style={styles.title}>Editar Formulário</Text>

        <TextInput
          placeholder="Título"
          placeholderTextColor={colors.third}
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          placeholder="Descrição"
          placeholderTextColor={colors.third}
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <TextInput
            placeholder="Selecionar data"
            placeholderTextColor={colors.third}
            style={styles.input}
            value={data ? data.toLocaleDateString("pt-BR") : ""}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={data || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={handleDateChange}
          />
        )}

        <ButtonInterface title="Atualizar" type="secondary" onPress={handleUpdate} />
        <ButtonInterface
          title="Voltar"
          type="primary"
          onPress={() => navigation.navigate("ListForms")}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
