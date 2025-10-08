import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { styles } from "../Register/styles";
import { colors } from "../../styles/colors";
import { ButtonInterface } from "../../components/ButtonInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FormStackParamList } from "../../navigations/FormsStackNavigation";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = NativeStackScreenProps<FormStackParamList, "RegisterForm">;

export function RegisterFormScreen({ navigation }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  function handleRegister() {
    if (!titulo || !descricao || !data) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    Alert.alert("Sucesso", "Formulário registrado com sucesso!");
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
        <Text style={styles.title}>Registrar Formulário</Text>

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

        {/* ✅ Novo botão para abrir a câmera */}
        <ButtonInterface
          title="Upload imagem"
          type="primary"
          onPress={() => navigation.navigate("Photo")}
        />

        <ButtonInterface
          title="Salvar"
          type="secondary"
          onPress={handleRegister}
        />
        <ButtonInterface
          title="Voltar"
          type="primary"
          onPress={() => navigation.navigate("ListForms")}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
