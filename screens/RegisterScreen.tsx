import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { auth, db } from '../firebase/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

export default function RegisterScreen({ navigation }: any) {

  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [usuario, setusuario] = useState("")
  const [edad, setedad] = useState(0)


  function register() {
    if (!usuario || !correo || !edad) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {

        const user = userCredential.user;

        save(user.uid)

        Alert.alert("Mensaje", "Registro exitoso")

        navigation.navigate('Login')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);

        Alert.alert("Error", errorMessage)
      });

  }

  async function save(uid: string) {

    await setDoc(doc(db, "usuarios", uid), {
      usuario: usuario,
      correo: correo,
      edad: edad,
    });

    console.log("Datos del usuario guardados");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Crear Cuenta</Text>

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

      <TextInput
        placeholder='Nombre de usuario'
        onChangeText={setusuario}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder='Edad'
        onChangeText={(text) => setedad(Number(text))}
        keyboardType='numeric'
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={register} style={[styles.button, styles.registerButton]}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? <Text style={styles.linkBold}>Inicia sesión</Text></Text>
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
