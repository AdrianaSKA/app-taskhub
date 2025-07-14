import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import CrearScreen from "../screens/CrearScreen";
import ListaScreen from "../screens/ListaScreen";
import EditarScreen from "../screens/EditarScreen";
import EliminarScreen from "../screens/EliminarScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Crear" component={CrearScreen} />
            <Stack.Screen name="Lista" component={ListaScreen} />
            <Stack.Screen name="Editar" component={EditarScreen} />
            <Stack.Screen name="Eliminar" component={EliminarScreen} />
        </Stack.Navigator>
    )
}



export default function NavegadorPrincipal() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}