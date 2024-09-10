import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Pay from "../components/Pay/Pay";
import Cart from "../components/Cart/Cart";
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';



// Pour utiliser la navigation stack + bottom
// Il suffit de faire pointer le bottom menu vers une classe comme celle ci
// Et c'est celle qui contiendra la nav stack.
// On y trouves un composants Cart qui lui va contenir un bouton qui pointe vers l'autre composant Pay.
// Le fait de déclarer les composant dans un stack navigator permet de stacker les deux les uns sur les autres.


export default function FirstSreenNavigator () {

    const Stack = createStackNavigator();
    
    return (
        // Bien mettre les composants stacké dans le bon ordre sinon ca ne marche pas.
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Pay" component={Pay} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
    
            
        </Stack.Navigator>
    );
}