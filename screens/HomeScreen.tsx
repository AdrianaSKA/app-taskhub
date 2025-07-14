import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsuario(data.usuario);
        }
      }
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, salir',
        style: 'destructive',
        onPress: () => {
          signOut(auth).then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }]
            });
          });
        }
      }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 TaskHub </Text>
      {usuario !== '' && <Text style={styles.subtitle}>¡Hola, {usuario}!</Text>}

      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, styles.createCard]} onPress={() => navigation.navigate("Crear")}>
          <Text style={styles.cardIcon}>➕</Text>
          <Text style={styles.cardTitle}>Nueva Tarea</Text>
          <Text style={styles.cardDescription}>Agrega una tarea a tu lista personal.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.readCard]} onPress={() => navigation.navigate("Lista")}>
          <Text style={styles.cardIcon}>📄</Text>
          <Text style={styles.cardTitle}>Ver Tareas</Text>
          <Text style={styles.cardDescription}>Revisa tus tareas registradas.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.updateCard]} onPress={() => navigation.navigate("Editar")}>
          <Text style={styles.cardIcon}>✏️</Text>
          <Text style={styles.cardTitle}>Editar Tarea</Text>
          <Text style={styles.cardDescription}>Modifica tareas existentes.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.deleteCard]} onPress={() => navigation.navigate("Eliminar")}>
          <Text style={styles.cardIcon}>🗑️</Text>
          <Text style={styles.cardTitle}>Eliminar Tarea</Text>
          <Text style={styles.cardDescription}>Elimina tareas que ya no necesitas.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={logout} style={[styles.card, styles.deleteCard]}>
        <Text style={styles.footer}>🚪 Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardIcon: {
    fontSize: 28,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  createCard: {
    backgroundColor: '#d1f7c4',
  },
  readCard: {
    backgroundColor: '#cce5ff',
  },
  updateCard: {
    backgroundColor: '#fff3cd',
  },
  deleteCard: {
    backgroundColor: '#f8d7da',
  },
  footer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
});
