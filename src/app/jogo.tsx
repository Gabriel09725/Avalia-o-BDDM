import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FireBase';

export default function Jogo() {
  const { nickname } = useLocalSearchParams<{ nickname: string }>();
  const router = useRouter();

  const [numeroSorteado, setNumeroSorteado] = useState<number>(0);
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState<number>(0);
  const [dica, setDica] = useState<{ texto: string; cor: string } | null>(null);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const iniciarNovoJogo = () => {
    const sorteado = Math.floor(Math.random() * 100) + 1;
    setNumeroSorteado(sorteado);
    setTentativas(0);
    setDica(null);
    setJogoFinalizado(false);
    setPalpite('');
  };

  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  const handleChutar = async () => {
    const numPalpite = parseInt(palpite, 10);

    if (isNaN(numPalpite) || numPalpite < 1 || numPalpite > 100) {
      Alert.alert('Inválido', 'Digite um número entre 1 e 100!');
      return;
    }

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (numPalpite === numeroSorteado) {
      setJogoFinalizado(true);
      setDica(null);

      try {
        await addDoc(collection(db, 'ranking'), {
          nickname: nickname || 'Anónimo',
          tentativas: novasTentativas,
          criadoEm: serverTimestamp(),
        });
      } catch (error) {
        console.error('Erro ao salvar no Firebase: ', error);
      }
    } else if (numPalpite < numeroSorteado) {
      setDica({ texto: 'O número a ser descoberto é MAIOR! ⬆️', cor: '#16a34a' });
    } else {
      setDica({ texto: 'O número a ser descoberto é MENOR! ⬇️', cor: '#dc2626' });
    }

    setPalpite('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Jogador: <Text style={styles.bold}>{nickname}</Text></Text>

      {!jogoFinalizado ? (
        <View style={styles.card}>
          <Text style={styles.instructions}>Tente adivinhar o número entre 1 e 100:</Text>
          <Text style={styles.tentativasText}>Tentativas realizadas: {tentativas}</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o número"
            keyboardType="numeric"
            value={palpite}
            onChangeText={setPalpite}
            maxLength={3}
          />

          <TouchableOpacity style={styles.button} onPress={handleChutar}>
            <Text style={styles.buttonText}>Chutar</Text>
          </TouchableOpacity>

          {dica && (
            <View style={[styles.dicaBox, { backgroundColor: dica.cor }]}>
              <Text style={styles.dicaText}>{dica.texto}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.winCard}>
          <Text style={styles.winTitle}> Parabéns! </Text>
          <Text style={styles.winText}>Você acertou o número <Text style={styles.bold}>{numeroSorteado}</Text>!</Text>
          <Text style={styles.winText}>Total de tentativas: <Text style={styles.bold}>{tentativas}</Text></Text>

          <TouchableOpacity style={styles.button} onPress={iniciarNovoJogo}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.rankingButton]} 
            onPress={() => router.push('/ranking')}
          >
            <Text style={styles.buttonText}>Ver Ranking </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  instructions: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 10,
  },
  tentativasText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  rankingButton: {
    backgroundColor: '#059669',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dicaBox: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  dicaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  winTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 10,
  },
  winText: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 10,
  },
});