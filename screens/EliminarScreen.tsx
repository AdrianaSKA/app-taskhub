import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/Config'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'


export default function EliminarTareaScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([])

  const cargarTareas = async () => {
    const user = auth.currentUser
    if (!user) return

    const tareasRef = collection(db, 'usuarios', user.uid, 'tareas')
    const snapshot = await getDocs(tareasRef)

    const lista: Tarea[] = []
    snapshot.forEach((docSnap) => {
      lista.push({ id: docSnap.id, ...docSnap.data() } as Tarea)
    })

    setTareas(lista)
  }

  const eliminar = async (id: string) => {
    const user = auth.currentUser
    if (!user) return

    Alert.alert('¿Eliminar tarea?', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await deleteDoc(doc(db, 'usuarios', user.uid, 'tareas', id))
          Alert.alert("Mensaje",'Tarea eliminada exitosamente')
          cargarTareas()
        },
      },
    ])
  }

  useEffect(() => {
    cargarTareas()
  }, [])

  type Tarea = {
  id: string
  title: string
  description: string
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗑️ Eliminar Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDesc}>{item.description}</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={() => eliminar(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1f2937',
  },
  taskDesc: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
