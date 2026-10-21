import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type Veiculo = {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
};

export default function ListaVeiculos() {
  const router = useRouter();

  const veiculos: Veiculo[] = [
    { id: '1', modelo: 'Civic', marca: 'Honda', ano: 2022 },
    { id: '2', modelo: 'Corolla', marca: 'Toyota', ano: 2023 },
    { id: '3', modelo: 'Golf', marca: 'Volkswagen', ano: 2021 },
    { id: '4', modelo: 'Onix', marca: 'Chevrolet', ano: 2022 },
  ];

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.card}>
      <Text style={styles.modelo}>{item.marca} {item.modelo}</Text>
      <Text style={styles.ano}>Ano: {item.ano}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
      </Pressable>

      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.cabecalho}>Frota de Veículos Disponíveis</Text>}
        ListFooterComponent={<Text style={styles.rodape}>Fim da lista</Text>}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        contentContainerStyle={styles.listaContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  textoBotaoVoltar: {
    fontWeight: 'bold',
    color: '#333',
  },
  listaContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  cabecalho: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  rodape: {
    marginTop: 15,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    width: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  modelo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  ano: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  separador: {
    height: 10,
  },
});