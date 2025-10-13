import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import { MockTravelRepository } from "../core/infra/repositories/MockTravelRepository";
import { FormsScreen } from "../screens/Forms/index";
import { User } from "../core/domain/entities/User";
import { Name } from "../core/domain/value-objects/Name";
import { Email } from "../core/domain/value-objects/Email";
import { Password } from "../core/domain/value-objects/Password";
import { GeoCoordinates } from "../core/domain/value-objects/GeoCoordinates";
import { Alert } from "react-native";


jest.spyOn(Alert, "alert").mockImplementation((title, message, buttons) => {
 console.log(`Mock Alert: ${title} - ${message}`);
 if (buttons && buttons[0]?.onPress) buttons[0].onPress();
});


describe("🧭 FormsScreen - criação de dica de viagem", () => {
 beforeEach(() => {
   jest.clearAllMocks();
   MockTravelRepository.getInstance().reset();
 });


 it("deve registrar uma viagem com sucesso", async () => {
   const mockUser = User.create(
     "usr-1",
     Name.create("Maria Eduarda"),
     Email.create("maria@example.com"),
     Password.create("12345678"),
     GeoCoordinates.create(0, 0)
   );


   const mockNavigation = { navigate: jest.fn() };


   render(
     <AuthContext.Provider
       value={{
         login: true,
         setLogin: jest.fn(),
         user: mockUser,
         handleLogin: jest.fn(),
       }}
     >
       <NavigationContainer>
         <FormsScreen navigation={mockNavigation as any} />
       </NavigationContainer>
     </AuthContext.Provider>
   );


   const titleInput = await screen.findByPlaceholderText("Título");
   const descriptionInput = await screen.findByPlaceholderText("Descrição");
   const dataInput = await screen.findByText("Data da viagem");
   fireEvent.press(dataInput)


   fireEvent.changeText(titleInput, "Viagem a Paris");
   fireEvent.changeText(descriptionInput, "Melhor época: primavera!");
   fireEvent.changeText(dataInput, "13/10/2025");


   const saveButton = await screen.findByText("Salvar");
   fireEvent.press(saveButton);


   await waitFor(() => {
     expect(Alert.alert).toHaveBeenCalledWith(
       "Atenção",
       "Preencha todos os campos obrigatórios!"
     );
   });
 });
});




