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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";
import styles from "./styles";
import { MeuTypes } from "../../navigations/MeuTabNavigation";
import * as ImagePicker from 'expo-image-picker';
import { ButtonInterface } from "../../components/ButtonInterface";
import { styles as baseStyles } from '../Register/styles'; // Import base styles

export function FormsScreen({ navigation }: MeuTypes) {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const travelUseCases = makeTravelUseCases();

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
    }
  }

  async function takePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Você recusou o acesso à câmera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
    }
  }

  async function handleRegister() {
    if (!title || !description || !date) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (!imageAsset) {
      Alert.alert("Atenção", "Selecione ou tire uma foto antes de salvar!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Faz upload da imagem antes de registrar
      const uploadedPhotoUrl = await travelUseCases.uploadFile.execute({
        imageAsset,
        bucket: 'upload',
        userId: "1", // substitua por user.id quando tiver autenticação
      });

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
        photoUrl: uploadedPhotoUrl, // URL retornada pelo upload
        date,
        latitude: 0,
        longitude: 0,
      });

      Alert.alert("Sucesso", "Viagem registrada com sucesso!");
      navigation.navigate("PublicacaoTab");
    } catch (err) {
      console.error(err);
      setError("Falha ao registrar viagem");
      Alert.alert("Erro", "Falha ao registrar viagem");
    } finally {
      setLoading(false);
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

            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
            />

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

            {imageAsset && (
              <Image source={{ uri: imageAsset.uri }} style={styles.uploadBox} />
            )}

            <View style={styles.uploadBox}>
              <ButtonInterface title="Tirar Foto" type="third" onPress={takePhoto} />
              <ButtonInterface title="Escolher Foto" type="third" onPress={pickImage} />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>

            {error && (
              <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
                {error}
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
