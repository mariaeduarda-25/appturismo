import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import PublicacoesScreen from "../screens/Publicacoes";
import { FormsScreen } from "../screens/Forms";

export type TravelStackParamList = {
  Publicacoes: undefined;
  Forms: undefined;
};
type TravelScreenProp = NativeStackNavigationProp<TravelStackParamList, 'Publicacoes'>
export type TravelTypes = {
  navigation: TravelScreenProp;
  route?: any;
};

const Stack = createNativeStackNavigator<TravelStackParamList>();

export function TravelStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Publicacoes"
        component={PublicacoesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forms"
        component={FormsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
