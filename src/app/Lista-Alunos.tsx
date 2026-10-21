import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type Aluno = {
  nome: string;
  idade: number;
  turma: string;
  nota1: number;
  nota2: number;
};

export default function TelaListaAlunos() {
  const router = useRouter();

  const aluno1: Aluno = { nome: 'Gabriel', idade: 17, turma: '22', nota1: 10, nota2: 8 };
  const aluno2: Aluno = { nome: 'Dafne', idade: 17, turma: '22', nota1: 7, nota2: 6 };
  const aluno3: Aluno = { nome: 'Dagemar', idade: 18, turma: '23', nota1: 7.5, nota2: 9 };
  const aluno4: Aluno = { nome: 'Jovenilia', idade: 19, turma: '23', nota1: 6, nota2: 5 };

  const lista: Aluno[] = [aluno1, aluno2, aluno3, aluno4];

  const renderizarAluno = ({ item }: { item: Aluno }) => {
    const media = (item.nota1 + item.nota2) / 2;
    const aprovado = media >= 7;

    return (
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.texto}>Idade: {item.idade} anos | Turma: {item.turma}</Text>
        <Text style={styles.texto}>Notas: {item.nota1} e {item.nota2}</Text>
        
        <View style={styles.divisorCard} />

        <Text style={styles.media}>Média Final: {media.toFixed(1)}</Text>
        <Text style={[styles.status, aprovado ? styles.aprovado : styles.reprovado]}>
          {aprovado ? "APROVADO" : "REPROVADO"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
      </Pressable>

      <Text style={styles.titulo}>Exercício: Lista de Alunos</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.nome}
        renderItem={renderizarAluno}
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
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  listaContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  texto: {
    fontSize: 14,
    color: '#555',
  },
  divisorCard: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  media: {
    fontWeight: '600',
  },
  status: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  aprovado: {
    color: 'green',
  },
  reprovado: {
    color: 'red',
  },
});