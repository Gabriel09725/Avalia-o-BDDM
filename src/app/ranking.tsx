import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../FireBase';
import { useRouter } from 'expo-router';

interface ItemRanking {
  id: string;
  nickname: string;
  tentativas: number;
}

export default function Ranking() {
  const [rankingData, setRankingData] = useState<ItemRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const buscarRanking = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'ranking'),
        orderBy('tentativas', 'asc'),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      const lista: ItemRanking[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({
          id: doc.id,
          nickname: data.nickname,
          tentativas: data.tentativas,
        });
      });

      setRankingData(lista);
    } catch (error) {
      console.error('Erro ao buscar ranking: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarRanking();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Top Jogadores</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" style={{ marginTop: 20 }} />
      ) : rankingData.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma pontuação registrada ainda.</Text>
      ) : (
        <FlatList
          data={rankingData}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.position}>#{index + 1}</Text>
              <Text style={styles.nickname}>{item.nickname}</Text>
              <Text style={styles.tentativas}>{item.tentativas} tent.</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
    width: 40,
  },
  nickname: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  tentativas: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});