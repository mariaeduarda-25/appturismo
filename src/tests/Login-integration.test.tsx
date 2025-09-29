import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';
import { AuthProvider } from '../context/auth';
import { MockUserRepository } from '../core/infra/repositories/MockUserRepository';

const Stack = createNativeStackNavigator();

describe('LoginScreen Integration', () => {
  beforeEach(() => {
    MockUserRepository.getInstance().reset();
  });

  it('should login successfully after registering', async () => {
    const { getByPlaceholderText, getByText, findByTestId } = render(
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Register'>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );

   
    fireEvent.changeText(getByPlaceholderText('Nome'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password123');
    fireEvent.press(getByText('Salvar'));

    const loginButton = await findByTestId('login-button');

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password123');
    fireEvent.press(loginButton);

    await waitFor(async () => {
      const user = await MockUserRepository.getInstance().findByEmail('test@example.com');
      expect(user).not.toBeNull();
    });
  });
});