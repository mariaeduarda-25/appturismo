import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Alert, Platform } from 'react-native';

import * as Location from "expo-location"; // <-- IMPORT NECESSÁRIO
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { LoginTypes } from '../../navigations/LoginStackNavigation';
import { ButtonInterface } from '../../components/ButtonInterface';
import { makeUserUseCases } from '../../core/factories/makeUserUsecases';

export function RegisterScreen({ navigation }: LoginTypes) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const userUseCases = makeUserUseCases();

  async function handleRegister() {
    setLoading(true);

    try {
      // 📍 1. Pedir permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert("Erro", "Permissão de localização negada.");
        setLoading(false);
        return;
      }

      // 📍 2. Pegar localização atual
      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      console.log("📍 Localização capturada:", latitude, longitude);

      // 📌 3. Registrar usuário no seu backend (use case)
      await userUseCases.registerUser.execute({
        name,
        email,
        password,
        latitude,
        longitude,
      });

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      console.log("❌ Erro ao registrar usuário:", error);
      Alert.alert('Erro', 'Falha ao registrar usuário');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <Text style={styles.title}>Cadastre-se</Text>

        <View style={styles.formRow}>
          <Ionicons name="person" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />
        </View>

        <View style={styles.formRow}>
          <MaterialIcons name="email" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formRow}>
          <Entypo name="key" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <ButtonInterface title='Salvar' type='secondary' onPress={handleRegister} />
        <ButtonInterface title='Voltar' type='primary' onPress={() => navigation.navigate('Login')} />
      </KeyboardAvoidingView>
    </View>
  );
}
