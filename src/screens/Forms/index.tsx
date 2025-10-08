import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { ButtonInterface } from "../../components/ButtonInterface";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function FormularioScreen() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState<Date | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  function handleSave() {
    if (!nome || !data || !titulo || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    // aqui você salvaria os dados
    Alert.alert("Sucesso", "Salvo com sucesso!");
  }

  function onChangeDate(event: any, selectedDate?: Date) {
    // No Android o onChange é chamado também quando o usuário fecha o diálogo
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      setData(selectedDate);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.header}>DICAS DE VIAGENS</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.blueBox}>
            <View style={styles.lilasBox}>
              <Text style={styles.subHeader}>
                Registre suas viagens com fotos, localizações e dicas que valem a
                lembrança!
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nome usuário:"
              value={nome}
              onChangeText={setNome}
            />

            {/* Campo de data: Touchable abre o calendário, input apenas mostra data */}
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Data:"
                value={data ? data.toLocaleDateString("pt-BR") : ""}
                editable={false} // importante: torna não editável e evita cursor
                pointerEvents="none"
              />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={data || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "calendar"}
                onChange={onChangeDate}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Título:"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição da viagem:"
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />

            <TouchableOpacity style={styles.locationButton}>
              <Ionicons
                name="location-outline"
                size={20}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>
                Adicionar localização atual
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>Upload imagem</Text>
            </TouchableOpacity>

            <ButtonInterface title="Salvar" type="primary" onPress={handleSave} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
