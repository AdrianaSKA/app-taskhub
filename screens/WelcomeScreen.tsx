import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }: any) {
    return (
        <ImageBackground
            style={styles.container}
            source={{ uri: "https://i.pinimg.com/736x/b6/ed/99/b6ed99ec94cf52db3144c82ab8823a8b.jpg" }}
            blurRadius={2}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>📚 Bienvenido a TaskHub</Text>
                <Text style={styles.subtitle}>
                    Regístrate o inicia sesión para comenzar esta grandiosa lectura y gestión de tareas.
                </Text>

                <Image
                    source={{ uri: 'https://i.pinimg.com/736x/36/1c/b7/361cb70302853ac1bc0e769a231a5953.jpg' }}
                    style={styles.image}
                />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        borderRadius: 20,
        padding: 24,
        margin: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2c2c54',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    image: {
        width: 280,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 12,
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#6d28d9',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        marginVertical: 8,
        width: 200,
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: '#10b981',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
