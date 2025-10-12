import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";
import styles from "./styles";
import { MeuTypes } from "../../navigations/MeuTabNavigation";

export function FormsScreen({ navigation }: MeuTypes) {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const travelUseCases = makeTravelUseCases();

  async function handleRegister() {
    if (!title || !description || !date) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      await travelUseCases.registerTravel.execute({
        user: {
          id: "1",
          name: { value: userName || "Usuário Anônimo" },
          email: { value: "teste@email.com" },
          password: { value: "123456" },
          location: { latitude: 0, longitude: 0 },
        },
        title,
        description,
        photoUrl,
        date,
        latitude: 0,
        longitude: 0,
      });

      Alert.alert("Sucesso", "Viagem registrada com sucesso!");
      navigation.navigate("PublicacaoTab");
    } catch (err) {
      Alert.alert("Erro", "Falha ao registrar viagem");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerBar}>
            <Text style={styles.header}>DICAS DE VIAGENS</Text>
          </View>

          <View style={styles.blueBox}>
            <View style={styles.lilasBox}>
              <Text style={styles.subHeader}>
                Registre suas viagens com fotos, localizações e dicas que valem
                a lembrança!
              </Text>
            </View>

            {/* Campo Nome */}
            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
            />

            {/* Campo Data com placeholder */}
            <TouchableOpacity
              style={[styles.input, { justifyContent: "center" }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: date ? "#000" : "#888" }}>
                {date ? date.toLocaleDateString("pt-BR") : "Data da viagem"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            {/* Campo Título */}
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

            {/* Campo Descrição */}
            <TextInput
              placeholder="Descrição"
              style={[styles.input, styles.textArea]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            {/* Botão Localização */}
            <TouchableOpacity style={styles.locationButton}>
              <Ionicons
                name="location-outline"
                size={18}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>
                Adicionar localização atual
              </Text>
            </TouchableOpacity>

            {/* Upload de imagem */}
            <View style={styles.uploadBox}>
              <Text style={styles.uploadText}>Upload imagem</Text>
            </View>

            {/* Botão Salvar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
