import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleStartGame = () => {
    if (!nickname.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o seu nickname para começar!');
      return;
    }

    router.push({
      pathname: '/jogo',
      params: { nickname: nickname.trim() }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Adivinhe o Número</Text>
      <Text style={styles.subtitle}>Digite o seu nickname para iniciar:</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu Nickname"
        value={nickname}
        onChangeText={setNickname}
        maxLength={20}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Iniciar Jogo</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.rankingButton]} 
        onPress={() => router.push('/ranking')}
      >
        <Text style={styles.buttonText}>Ver Ranking </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  rankingButton: {
    backgroundColor: '#059669',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});