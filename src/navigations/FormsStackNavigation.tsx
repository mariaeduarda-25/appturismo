import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListFormsScreen } from "../screens/Forms/ListFormScreen";
import { RegisterFormScreen } from "../screens/Forms/RegisterFormScreen";
import { EditFormScreen } from "../screens/Forms/EditFormScreen";
import { FormDetailsScreen } from "../screens/Forms/FormDetailsScreen";
import { PhotoScreen } from "../screens/Camera/Photo"; 

export type Form = {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
};

export type FormStackParamList = {
  ListForms: undefined;
  RegisterForm: undefined;
  EditForm: { form: Form };
  FormDetails: { form: Form };
  Photo: undefined;
};

const Stack = createNativeStackNavigator<FormStackParamList>();

export function FormsStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListForms" component={ListFormsScreen} />
      <Stack.Screen name="RegisterForm" component={RegisterFormScreen} />
      <Stack.Screen name="EditForm" component={EditFormScreen} />
      <Stack.Screen name="FormDetails" component={FormDetailsScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} /> {}
    </Stack.Navigator>
  );
}
