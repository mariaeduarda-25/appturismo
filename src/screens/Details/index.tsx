import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import styles from "./styles";
import EvilIcons from "@expo/vector-icons/EvilIcons";

// Tipos locais
interface Publicacao {
  id: string;
  nome: string;
  data: string;
  titulo: string;
  localizacao: string;
  imagem: string;
  descricao?: string;
}

type RootStackParamList = {
  Publicacoes: undefined;
  Details: { publicacao: Publicacao };
};

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { publicacao } = route.params;

  const handleEdit = () => {
    console.log("Editar:", publicacao.id);
  };

  const handleDelete = () => {
    console.log("Excluir:", publicacao.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DICAS DE VIAGENS</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerCard}>
            <View style={styles.textInfo}>
              <Text style={styles.nome}>{publicacao.nome}</Text>
              <Text style={styles.data}>{publicacao.data}</Text>
            </View>

            <View style={styles.icons}>
              <TouchableOpacity onPress={handleEdit}>
                <EvilIcons name="pencil" size={28} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete}>
                <EvilIcons name="trash" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.titulo}>{publicacao.titulo}</Text>
          <Text style={styles.localizacao}>{publicacao.localizacao}</Text>

          <Image source={{ uri: publicacao.imagem }} style={styles.imagem} />

          <View style={styles.descricaoBox}>
            <Text style={styles.descricao}>{publicacao.descricao}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}