import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pay from "../components/Pay/Pay";
import Cart from "../components/Cart/Cart";
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
const Stack = createNativeStackNavigator();

export default function FirstScreenNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Pay" component={Pay} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}