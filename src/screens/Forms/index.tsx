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
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";
import styles from "./styles";
import { MeuTypes } from "../../navigations/MeuTabNavigation";

export function FormsScreen({ navigation }: MeuTypes) {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const travelUseCases = makeTravelUseCases();

  async function handleRegister() {
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
        date: new Date(),
        latitude: 0,
        longitude: 0
      });
      console.log(await travelUseCases.findAllTravel.execute())

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
          {/* Título principal */}
          <View style={styles.headerBar}>
            <Text style={styles.header}>DICAS DE VIAGENS</Text>
          </View>

          {/* Caixa azul principal */}
          <View style={styles.blueBox}>
            {/* Caixa lilás de instruções */}
            <View style={styles.lilasBox}>
              <Text style={styles.subHeader}>
                Registre suas viagens com fotos, localizações e dicas que valem a lembrança!
              </Text>
            </View>

            {/* Campos */}
            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
            />

            <TextInput
              placeholder="Data (DD/MM/AAAA)"
              style={styles.input}
              value={date}
              onChangeText={setDate}
            />

            <TextInput
              placeholder="Título"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Descrição"
              style={[styles.input, styles.textArea]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            {/* Localização */}
            <TouchableOpacity style={styles.locationButton}>
              <Ionicons
                name="location-outline"
                size={18}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>Adicionar localização atual</Text>
            </TouchableOpacity>

            {/* Upload */}
            <View style={styles.uploadBox}>
              <Text style={styles.uploadText}>Upload imagem</Text>
            </View>

            {/* Botão salvar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
