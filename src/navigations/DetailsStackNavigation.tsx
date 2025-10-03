import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PublicacoesScreen from "../screens/Publicacoes";
import DetailsScreen from "../screens/Details";
import { Travel } from "../core/domain/entities/Travel";

interface Publicacao {
  id: string;
  nome: string;
  data: string;
  titulo: string;
  localizacao: string;
  imagem: string;
  descricao?: string;
}

export type RootStackParamList = {
  Publicacoes: undefined;
  Details: { publicacao: Travel };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function DetailsStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Publicacoes" component={PublicacoesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}