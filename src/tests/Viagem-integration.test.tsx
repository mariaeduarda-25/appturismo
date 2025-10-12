import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import App from '../../App'; // usa seu App principal — ele já tem NavigationContainer

// mock do Alert para evitar erro durante os testes
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Integração - CRUD de Dicas de Viagens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar, listar, editar e excluir uma publicação', async () => {
    // renderiza o App completo (sem NavigationContainer duplicado)
    render(<App />);

    // aguarda o botão de nova publicação aparecer
    const addButton = await screen.findByText(/nova publicação/i);
    fireEvent.press(addButton);

    // preenche os campos do formulário
    fireEvent.changeText(screen.getByPlaceholderText(/título/i), 'Viagem para o Rio');
    fireEvent.changeText(screen.getByPlaceholderText(/descrição/i), 'Um passeio incrível pelas praias.');
    fireEvent.changeText(screen.getByPlaceholderText(/localização/i), 'Rio de Janeiro');

    // salva a nova publicação
    fireEvent.press(screen.getByText(/salvar/i));

    // aguarda alerta de sucesso
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Publicação registrada com sucesso!');
    });

    // verifica se a publicação aparece na lista
    await waitFor(() => {
      expect(screen.getByText('Viagem para o Rio')).toBeTruthy();
    });

    // entra nos detalhes
    fireEvent.press(screen.getByText('Viagem para o Rio'));

    // edita a publicação
    fireEvent.press(screen.getByText(/editar/i));
    fireEvent.changeText(screen.getByPlaceholderText(/descrição/i), 'Um passeio inesquecível!');
    fireEvent.press(screen.getByText(/atualizar/i));

    // verifica alerta de atualização
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Publicação atualizada com sucesso!');
    });

    // deleta a publicação
    fireEvent.press(screen.getByText(/excluir/i));

    // simula confirmação do alerta de exclusão
    (Alert.alert as jest.Mock).mock.calls[0][2][1].onPress();

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Publicação excluída com sucesso!');
    });
  });
});
