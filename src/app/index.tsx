import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuCinema() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.nomeCinema}>CineMello</Text>
      <Text style={styles.subtitulo}>Bem-vindo ao CineMello !</Text>

      <Pressable 
        style={styles.botao} 
        onPress={() => router.push('/Filmes')}
      >
        <Text style={styles.textoBotao}>Ver Listagem de Filmes</Text>
      </Pressable>

      <Pressable 
        style={styles.botao} 
        onPress={() => router.push('/Sessoes')}
      >
        <Text style={styles.textoBotao}>Compre seu Ingresso</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
  },
  nomeCinema: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#e50914',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});