import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../firebase/Config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditarTareaScreen() {
  const [id, setId] = useState('');
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');

  async function cargarTarea() {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, 'usuarios', user.uid, 'tareas', id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setNuevoTitulo(snap.data().title);
      setNuevaDescripcion(snap.data().description);
    } else {
      Alert.alert('Error', 'Tarea no encontrada');
    }
  }

  async function actualizarTarea() {
    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(doc(db, 'usuarios', user.uid, 'tareas', id), {
      title: nuevoTitulo,
      description: nuevaDescripcion,
    });

    Alert.alert("Mensaje",'Tarea actualizada exitosamente');
    setId('');
    setNuevoTitulo('');
    setNuevaDescripcion('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✏️ Editar Tarea</Text>

      <TextInput
        placeholder="ID de la tarea"
        value={id}
        onChangeText={setId}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={cargarTarea} style={styles.button}>
        <Text style={styles.buttonText}>Cargar Tarea</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nuevo título"
        value={nuevoTitulo}
        onChangeText={setNuevoTitulo}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Nueva descripción"
        value={nuevaDescripcion}
        onChangeText={setNuevaDescripcion}
        style={[styles.input, styles.textarea]}
        multiline
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={actualizarTarea} style={[styles.button, styles.updateButton]}>
        <Text style={styles.buttonText}>Actualizar Tarea</Text>
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
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  updateButton: {
    backgroundColor: '#10b981', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
