import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {ButtonInterface} from "../../components/ButtonInterface";
import { useAuth } from "../../context/auth";
import { FindAllTravel } from "../../core/domain/use-cases/FindAllTravel";
import { makeTravelUseCases } from "../../core/factories/makeTraveUsecases";
import { Travel } from "../../core/domain/entities/Travel";
import { RootStackParamList } from "../../navigations/DetailsStackNavigation";


interface Publicacao {
  id: string;
  nome: string;
  data: string;
  titulo: string;
  localizacao: string;
  imagem: string;
  descricao?: string;
}

type PublicacoesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Publicacoes"
>;

export default function PublicacoesScreen() {
  const { setLogin } = useAuth();
  const [records, setRecords] = useState<Travel[] | null>(null);
  const [busca, setBusca] = useState("");
  const navigation = useNavigation<PublicacoesNavigationProp>();
  const [dicas] = useState<Publicacao[]>([]);
  const findAllTravel = makeTravelUseCases();

  async function fetchRecords() {
    try {
      const allRecords = await findAllTravel.findAllTravel.execute();
      setRecords(allRecords);
    } catch (err) {
      console.log("Failed to fetch records");
    } 
  }

  useEffect(() => {
    fetchRecords()
  }, []);

  const dicasFiltradas = records?.filter((d) =>
    d.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DICAS DE VIAGENS</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar Publicações"
          value={busca}
          onChangeText={setBusca}
        />
      </View>
      <FlatList
        data={dicasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { publicacao: item })}
          >
            <Text style={styles.nome}>{item.user.name?.value}</Text>
            <Text style={styles.data}>{item.date.toDateString()}</Text>
            <Text style={styles.titulo}>{item.title}</Text>
            <Image source={{ uri: item.photo?.url }} style={styles.imagem} />
          </TouchableOpacity>
        )}
      />
       <ButtonInterface title='Sair' type='primary' onPress={()=> setLogin(false)} />
    </View>
  );
}