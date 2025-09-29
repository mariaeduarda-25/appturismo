import React, { useState } from "react";
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

type PublicacoesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Publicacoes"
>;

export default function PublicacoesScreen() {
  const { setLogin } = useAuth();
  const [busca, setBusca] = useState("");
  const navigation = useNavigation<PublicacoesNavigationProp>();

  const [dicas] = useState<Publicacao[]>([
    {
      id: "1",
      nome: "Rebecca",
      data: "06/01/25",
      titulo: "Viagem para Campos do Jordão",
      localizacao: "São Paulo, Brasil",
      imagem:
        "https://www.melhoresdestinos.com.br/wp-content/uploads/2022/11/teleferico-campos-jordao-capa.jpg",
      descricao:
        "A viagem para Campos do Jordão foi uma experiência incrível! Indico o Hotel A e o restaurante B.",
    },
    {
      id: "2",
      nome: "Maria Eduarda",
      data: "07/01/25",
      titulo: "Viagem para Gramado",
      localizacao: "Rio Grande do Sul, Brasil",
      imagem:
        "https://blog.123milhas.com/wp-content/uploads/2022/12/aniversario-de-gramado-quatro-curiosidades-sobre-a-cidade-conexao123.jpg",
      descricao:
        "Gramado é encantador! Não deixe de visitar a Rua Coberta e o Lago Negro.",
    },
  ]);

  const dicasFiltradas = dicas.filter((d) =>
    d.titulo.toLowerCase().includes(busca.toLowerCase())
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
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.data}>{item.data}</Text>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.localizacao}>{item.localizacao}</Text>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
          </TouchableOpacity>
        )}
      />
       <ButtonInterface title='Sair' type='primary' onPress={()=> setLogin(false)} />
    </View>
  );
}