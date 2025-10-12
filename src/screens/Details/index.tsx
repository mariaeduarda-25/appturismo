import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import styles from "./styles";
import { RootStackParamList } from "../../navigations/DetailsStackNavigation";
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { publicacao } = route.params;
  const travelUsecases = makeTravelUseCases();

  // 🔧 Conversão segura da data (evita Invalid Date e objetos não serializáveis)
  const safeDate = (() => {
    try {
      if (!publicacao?.date) return "";
      const date =
        typeof publicacao.date === "string"
          ? new Date(publicacao.date)
          : new Date(publicacao.date?.toISOString?.() ?? "");
      return isNaN(date.getTime())
        ? ""
        : date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
    } catch {
      return "";
    }
  })();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(publicacao.title || "");
  const [description, setDescription] = useState(publicacao.description || "");
  const [photoUrl, setPhotoUrl] = useState(publicacao.photo?.url || "");

  // ✏️ Editar publicação
  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      setLoading(true);
      await travelUsecases.updateTravel.execute({
        id: publicacao.id,
        title,
        description,
        photoUrl,
      });
      Alert.alert("Sucesso", "Publicação atualizada com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao atualizar publicação.");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Excluir publicação
  const handleDelete = async () => {
    Alert.alert("Excluir publicação", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await travelUsecases.deleteTravel.execute({ id: publicacao.id });
            Alert.alert("Sucesso", "Publicação excluída com sucesso!");
          } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível excluir a publicação.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DICAS DE VIAGENS</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerCard}>
            <View style={styles.textInfo}>
              <Text style={styles.nome}>{publicacao.user?.name?.value}</Text>
              <Text style={styles.data}>{safeDate}</Text>
            </View>

            <View style={styles.icons}>
              <TouchableOpacity onPress={handleEdit}>
                <EvilIcons
                  name={isEditing ? "check" : "pencil"}
                  size={28}
                  color={isEditing ? "green" : "black"}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete}>
                {loading ? (
                  <ActivityIndicator size="small" color="red" />
                ) : (
                  <EvilIcons name="trash" size={28} color="red" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {!isEditing ? (
            <>
              <Text style={styles.titulo}>{title}</Text>
              {photoUrl ? (
                <Image source={{ uri: photoUrl }} style={styles.imagem} />
              ) : null}
              <View style={styles.descricaoBox}>
                <Text style={styles.descricao}>{description}</Text>
              </View>
            </>
          ) : (
            <View style={{ width: "100%", marginTop: 10 }}>
              <TextInput
                style={[
                  styles.descricao,
                  {
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 6,
                    marginBottom: 10,
                    padding: 8,
                  },
                ]}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={[
                  styles.descricao,
                  {
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 6,
                    marginBottom: 10,
                    padding: 8,
                  },
                ]}
                placeholder="Descrição"
                multiline
                value={description}
                onChangeText={setDescription}
              />

              <TextInput
                style={[
                  styles.descricao,
                  {
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 6,
                    marginBottom: 10,
                    padding: 8,
                  },
                ]}
                placeholder="URL da imagem"
                value={photoUrl}
                onChangeText={setPhotoUrl}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
