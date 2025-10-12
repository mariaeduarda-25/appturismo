import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ButtonInterface } from "../../components/ButtonInterface";
import { useAuth } from "../../context/auth";
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";
import { Travel } from "../../core/domain/entities/Travel";
import { TravelTypes } from "../../navigations/DetailsStackNavigation";

export default function PublicacoesScreen({ navigation }: TravelTypes) {
  const { setLogin } = useAuth();
  const [records, setRecords] = useState<Travel[]>([]);
  const [busca, setBusca] = useState("");
  const [dicasFiltradas, setDicasFiltradas] = useState<Travel[]>([]);
  const travelUsecases = makeTravelUseCases();

  // 🔁 Recarrega automaticamente quando a tela volta ao foco
  useFocusEffect(
    useCallback(() => {
      async function fetchRecords() {
        try {
          const allRecords = await travelUsecases.findAllTravel.execute();

          // 🔧 Garante que todos os registros tenham 'date' como Date
          const normalized = (allRecords ?? []).map((item) => ({
            ...item,
            date:
              item.date instanceof Date ? item.date : new Date(item.date),
          }));

          setRecords(normalized);
          setDicasFiltradas(normalized);
        } catch (err) {
          console.log("Erro ao buscar viagens:", err);
        }
      }

      fetchRecords();
    }, [])
  );

  // 🔍 Filtra conforme a busca
  const dicasFiltradasFunc = (texto: string) => {
    setBusca(texto);

    if (texto.trim() === "") {
      setDicasFiltradas(records);
    } else {
      const filtradas = records.filter((d) =>
        d.title.toLowerCase().includes(texto.toLowerCase())
      );
      setDicasFiltradas(filtradas);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DICAS DE VIAGENS</Text>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar Publicações"
          value={busca}
          onChangeText={dicasFiltradasFunc}
        />
      </View>

      {/* Lista de publicações */}
      <FlatList
        data={dicasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                publicacao: {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  // 👇 Garante que o tipo continue Date
                  date:
                    item.date instanceof Date
                      ? item.date
                      : new Date(item.date),
                  user: item.user,
                  photo: item.photo,
                },
              })
            }
          >
            <Text style={styles.nome}>{item.user.name?.value}</Text>
            <Text style={styles.data}>
              {item.date instanceof Date
                ? item.date.toLocaleDateString("pt-BR")
                : new Date(item.date).toLocaleDateString("pt-BR")}
            </Text>
            <Text style={styles.titulo}>{item.title}</Text>
            {item.photo?.url ? (
              <Image source={{ uri: item.photo.url }} style={styles.imagem} />
            ) : null}
          </TouchableOpacity>
        )}
      />

      {/* Botão de sair */}
      <ButtonInterface
        title="Sair"
        type="primary"
        onPress={() => setLogin(false)}
      />
    </View>
  );
}
