import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

type Aluno = {
  nome: string;
  idade: number;
  turma: string;
  nota1: number;
  nota2: number;
};

export default function ListaAlunos() {
  const aluno1: Aluno = { nome: 'Ana', idade: 10, turma: '22', nota1: 10, nota2: 8 };
  const aluno2: Aluno = { nome: 'Carlos', idade: 11, turma: '22', nota1: 7, nota2: 6 };
  const aluno3: Aluno = { nome: 'Cláudio', idade: 10, turma: '23', nota1: 7.5, nota2: 9 };
  const aluno4: Aluno = { nome: 'Renato', idade: 11, turma: '23', nota1: 6, nota2: 5 };

  const lista: Aluno[] = [aluno1, aluno2, aluno3, aluno4];

  const renderizarAluno = ({ item }: { item: Aluno }) => {
    const media = (item.nota1 + item.nota2) / 2;
    const aprovado = media >= 7; // Considera média 7 para aprovação

    return (
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>Idade: {item.idade} anos | Turma: {item.turma}</Text>
        <Text>Notas: {item.nota1} e {item.nota2}</Text>
        
        <View style={styles.divisor} />

        <Text style={styles.media}>Média Final: {media.toFixed(1)}</Text>
        <Text style={[styles.status, aprovado ? styles.aprovado : styles.reprovado]}>
          {aprovado ? "APROVADO" : "REPROVADO"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Alunos</Text>
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
    width: '100%',
    padding: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  listaContainer: {
    alignItems: 'center',
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
  divisor: {
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