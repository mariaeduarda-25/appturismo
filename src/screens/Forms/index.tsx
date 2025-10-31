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
import { supabase } from '../../core/infra/supabase/client/supabaseClient';
import * as ImagePicker from 'expo-image-picker';
import { ButtonInterface } from "../../components/ButtonInterface";
import { styles as baseStyles } from '../Register/styles'; // Import base styles

export function FormsScreen({ navigation }: MeuTypes) {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset | null>(null); // Stores the selected image asset

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
      Alert.alert("You've refused to allow this app to access your camera!");
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

        {imageAsset && <Image source={{ uri: imageAsset.uri }} style={styles.uploadBox} />}
        <View style={styles.uploadBox}>
            <ButtonInterface title='Take Photo' type='third' onPress={takePhoto} />
            <ButtonInterface title='Pick Image' type='third' onPress={pickImage} />
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
