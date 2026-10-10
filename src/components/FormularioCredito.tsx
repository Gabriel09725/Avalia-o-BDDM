import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Switch, Pressable } from "react-native";

export default function FormularioCredito() {
  const [nome, setNome] = useState("");
  const [idade, idadeMudou] = useState("");
  const [rendaAnual, rendaMudou] = useState("");
  const [possuiClt, setPossuiClt] = useState(false);
  const [possuiDivida, setPossuiDivida] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const calcularCredito = () => {
    const idadeNum = Number(idade);
    const rendaNum = Number(rendaAnual);

    if (possuiDivida) {
      setResultado({
        aprovado: false,
        mensagem: "SEM DIREITO A CRÉDITO",
        detalhe: "O correntista possui dívidas ativas.",
      });
      return;
    }

    let percentual = 0;
    if (idadeNum <= 24) {
      percentual = 0.25;
    } else if (idadeNum <= 49) {
      percentual = 0.40;
    } else if (idadeNum <= 64) {
      percentual = 0.30;
    } else {
      percentual = 0.15;
    }

    if (!possuiClt) {
      percentual = percentual / 2;
    }

    const valorCredito = rendaNum * percentual;

    setResultado({
      aprovado: true,
      mensagem: "CRÉDITO APROVADO",
      detalhe: `R$ ${rendaNum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} x ${percentual * 100}% = R$ ${valorCredito.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} de crédito aprovado`,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}> Faça sua Análise de Crédito!</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Correntista"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={idadeMudou}
      />

      <TextInput
        style={styles.input}
        placeholder="Renda Anual (Ex: 20000)"
        keyboardType="numeric"
        value={rendaAnual}
        onChangeText={rendaMudou}
      />

      <View style={styles.linhaSwitch}>
        <Text>Possui vínculo CLT?</Text>
        <Switch value={possuiClt} onValueChange={setPossuiClt} />
      </View>

      <View style={styles.linhaSwitch}>
        <Text>Possui dívida?</Text>
        <Switch value={possuiDivida} onValueChange={setPossuiDivida} />
      </View>

      <Pressable style={styles.botao} onPress={calcularCredito}>
        <Text style={styles.textoBotao}>Consultar Crédito</Text>
      </Pressable>

      {resultado && (
        <View style={styles.resultadoContainer}>
          <Text style={[styles.status, resultado.aprovado ? styles.aprovado : styles.negado]}>
            {resultado.mensagem}
          </Text>
          <Text style={styles.textoResultado}>{resultado.detalhe}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fafafa",
  },
  linhaSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  botao: {
    backgroundColor: "#0056b3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultadoContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    alignItems: "center",
  },
  status: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  aprovado: {
    color: "green",
  },
  negado: {
    color: "red",
  },
  textoResultado: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
});