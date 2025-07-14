import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/Config'
import { collection, getDocs } from 'firebase/firestore'


export default function ListaTareasScreen() {
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
      <Text style={styles.title}>📝 Lista de Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item: Tarea) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDesc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 6,
  },
  taskDesc: {
    fontSize: 15,
    color: '#555',
  },
})
