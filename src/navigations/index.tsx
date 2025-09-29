import { NavigationContainer } from "@react-navigation/native";
import { MeuTabNavigation } from "./MeuTabNavigation";
import { LoginStackNavigation } from "./LoginStackNavigation";
import { useState } from "react";
import { useAuth } from "../context/auth";


export function Navigation() {
    const {login} = useAuth()
    return (
        <NavigationContainer>
            {login ? <MeuTabNavigation /> : <LoginStackNavigation />}
        </NavigationContainer>
    )
}