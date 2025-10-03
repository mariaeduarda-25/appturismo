import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { ButtonInterface } from "../../components/ButtonInterface";
import { makeTravelUseCases } from '../../core/factories/makeTraveUsecases';
import { VinylRecordTypes } from '../navigations/VinylRecordStackNavigation';

export function FormsScreen({ navigation }: TravelTypes) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [numberOfTracks, setNumberOfTracks] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vinylRecordUseCases = makeVinylRecordUseCases();


export default function FormularioScreen() {
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
            />
            <TextInput
              style={styles.input}
              placeholder="Data:"
            />
            <TextInput
              style={styles.input}
              placeholder="Título:"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição da viagem:"
              multiline
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

            <ButtonInterface title='Salvar' type='primary'/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}