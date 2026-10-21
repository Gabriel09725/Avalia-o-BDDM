import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

type Props = {
  nome: string;
  idade: number;
  turma: string;
  nota1: number;
  nota2: number;
};

export default function CardAluno({ nome, idade, turma, nota1, nota2 }: Props) {
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const media = (nota1 + nota2) / 2;
  const aprovado = media >= 7;

  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.texto}>Idade: {idade} anos</Text>
      <Text style={styles.texto}>Turma: {turma}</Text>
      <Text style={styles.texto}>Nota 1: {nota1} | Nota 2: {nota2}</Text>

      <Pressable style={styles.botao} onPress={() => setMostrarResultado(true)}>
        <Text style={styles.textoBotao}>Calcular Média</Text>
      </Pressable>

      {mostrarResultado && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.textoResultado}>Média Final: {media.toFixed(1)}</Text>
          <Text style={[styles.status, aprovado ? styles.aprovado : styles.reprovado]}>
            {aprovado ? "APROVADO" : "REPROVADO"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  texto: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  botao: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultadoContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  textoResultado: {
    fontSize: 14,
    fontWeight: '600',
  },
  status: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 4,
  },
  aprovado: {
    color: 'green',
  },
  reprovado: {
    color: 'red',
  },
});