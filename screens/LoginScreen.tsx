import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';


export default function LoginScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);

                Alert.alert("Mensaje", "Login exitoso")

                navigation.navigate('Home')
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);


                if (errorCode == "auth/invalid-email") {
                    errorCode = "Credenciales invalidas"
                    errorMessage = "Verificar correo y contraseña"
                } else if (errorCode == "auth/missing-password") {
                    errorCode = "Error en contraseña"
                    errorMessage = "No se reconocio la contraseña o se envio la contraseña en blanco"
                } else {
                    errorCode = "Error"
                    errorMessage = "Error en las credenciales, verificar correo y contraseña"
                }

                Alert.alert(errorCode, errorMessage)

            });

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔐 Iniciar Sesión</Text>

            <TextInput
                placeholder='Correo electrónico'
                onChangeText={setcorreo}
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize="none"
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder='Contraseña'
                onChangeText={setcontrasenia}
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#999"
            />

            <TouchableOpacity onPress={login} style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>¿Aún no tienes cuenta? <Text style={styles.linkBold}>Regístrate aquí</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 32,
        color: '#1f2937',
    },
    input: {
        backgroundColor: '#f3f4f6',
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    button: {
        backgroundColor: '#3b82f6',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
    },
    registerButton: {
        backgroundColor: '#10b981',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    linkText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6b7280',
    },
    linkBold: {
        color: '#2563eb',
        fontWeight: 'bold',
    },
});
