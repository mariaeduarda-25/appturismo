import React, { useState, useEffect } from "react";
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

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';

import { ButtonInterface } from "../../components/ButtonInterface";
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";
import styles from "./styles";
import { MeuTypes } from "../../navigations/MeuTabNavigation";
import { useAuth } from "../../context/auth";

export function FormsScreen({ navigation }: MeuTypes) {

  const [userName, setUserName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const travelUseCases = makeTravelUseCases();
  const {user} = useAuth()


  useEffect(() => {
    async function loadLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Erro", "Permissão de localização negada");
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    }

    loadLocation();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) setImageAsset(result.assets[0]);
  }

  async function takePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Você recusou o acesso à câmera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) setImageAsset(result.assets[0]);
  }


  async function handleRegister() {
    if (!title || !description || !date) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (!location) {
      Alert.alert("Atenção", "Selecione um ponto no mapa!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // const uploadedPhotoUrl = await travelUseCases.uploadFile.execute({
      //   imageAsset,
      //   bucket: 'upload',
      //   userId: "1",
      // });
      const uploadedPhotoUrl = imageAsset?.uri

      await travelUseCases.registerTravel.execute({
        user: {
          id: user?.id || "",
          name: { value: user?.name.value || "Usuário Anônimo" },
          email: { value: user?.email.value || ""},
          password: { value: "123456" },
          location: location,
        },
        title,
        description,
        photoUrl: uploadedPhotoUrl,
        date,
        latitude: location.latitude,
        longitude: location.longitude,
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
         <View style={styles.headerBar} >
          <Text style={styles.header}>DICAS DE VIAGENS</Text>
        </View>

        <View style={styles.blueBox}>
          <View style={styles.lilasBox}>
            <Text style={styles.subHeader}>
              Registre suas viagens com fotos,localizações e dicas que valem a lembrança!
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

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Selecione a localização no mapa:
          </Text>

          {location && (
            <MapView
              style={{
                width: "100%",
                height: 250,
                borderRadius: 10,
                marginTop: 10,
              }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              onPress={(e) =>
                setLocation({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }
            >
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) =>
                  setLocation(e.nativeEvent.coordinate)
                }
              />
            </MapView>
          )}

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