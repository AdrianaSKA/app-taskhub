import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../firebase/Config';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function CrearScreen() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setid] = useState("")

async function guardar() {
  const user = auth.currentUser;
  if (!user) return;

  if (!id.trim() || !titulo.trim() || !descripcion.trim()) {
    Alert.alert("Error", "Todos los campos son obligatorios.");
    return;
  }

  const tareaRef = doc(db, "usuarios", user.uid, "tareas", id); 

  await setDoc(tareaRef, {
    title: titulo,
    description: descripcion,
    completed: false,
    createdAt: serverTimestamp(),
  });

  Alert.alert("Mensaje","Tarea guardada exitosamente");
  setid('');
  setTitulo('');
  setDescripcion('');
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Nueva Tarea</Text>

      <TextInput
        placeholder='ID de la tarea'
        value={id}
        onChangeText={setid}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder='Título'
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder='Descripción'
        value={descripcion}
        onChangeText={setDescripcion}
        style={[styles.input, styles.textarea]}
        multiline
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={guardar} style={styles.button}>
        <Text style={styles.buttonText}>Guardar Tarea</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});