import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

type StatusAssento = 'disponivel' | 'ocupado' | 'selecionado';

export default function TelaPagamento() {
  const router = useRouter();

  const [assentos, setAssentos] = useState<{ [key: string]: StatusAssento }>({
    'A1': 'disponivel', 'A2': 'ocupado',    'A3': 'disponivel', 'A4': 'disponivel', 'A5': 'ocupado',
    'B1': 'disponivel', 'B2': 'disponivel', 'B3': 'ocupado',    'B4': 'disponivel', 'B5': 'disponivel',
    'C1': 'ocupado',    'C2': 'disponivel', 'C3': 'disponivel', 'C4': 'disponivel', 'C5': 'disponivel',
  });

  const [assentoSelecionado, setAssentoSelecionado] = useState<string | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<'Pix' | 'Cartão' | 'Boleto'>('Pix');

  const selecionarAssento = (id: string) => {
    if (assentos[id] === 'ocupado') {
      Alert.alert('Assento Indisponível', 'Este assento já está ocupado por outro cliente.');
      return;
    }

    const novosAssentos = { ...assentos };

    if (assentoSelecionado && assentoSelecionado !== id) {
      novosAssentos[assentoSelecionado] = 'disponivel';
    }

    if (assentoSelecionado === id) {
      novosAssentos[id] = 'disponivel';
      setAssentoSelecionado(null);
    } else {
      novosAssentos[id] = 'selecionado';
      setAssentoSelecionado(id);
    }

    setAssentos(novosAssentos);
  };

  const confirmarPagamento = () => {
    if (!assentoSelecionado) {
      Alert.alert('Atenção', 'Por favor, escolha um assento antes de prosseguir.');
      return;
    }

    Alert.alert(
      'Compra Confirmada! ',
      `Assento: ${assentoSelecionado}\nForma de Pagamento: ${metodoPagamento}\nBom filme!`,
      [
        {
          text: 'Voltar ao Menu',
          onPress: () => router.push('/'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
      </Pressable>

      <Text style={styles.tituloTela}>Assentos e Pagamento</Text>

      <View style={styles.telaCinemaContainer}>
        <View style={styles.telaCinemaBarra} />
        <Text style={styles.textoTelaCinema}>TELA</Text>
      </View>

      <Text style={styles.subtitulo}>Escolha seu Assento:</Text>
      <View style={styles.mapaAssentos}>
        {Object.keys(assentos).map((id) => {
          const status = assentos[id];
          return (
            <Pressable
              key={id}
              style={[
                styles.assento,
                status === 'ocupado' && styles.assentoOcupado,
                status === 'selecionado' && styles.assentoSelecionado,
              ]}
              onPress={() => selecionarAssento(id)}
            >
              <Text style={styles.textoAssento}>{id}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.legendaContainer}>
        <View style={styles.itemLegenda}>
          <View style={[styles.assento, styles.assentoDisponivelExemplo]} />
          <Text style={styles.textoLegenda}>Livre</Text>
        </View>
        <View style={styles.itemLegenda}>
          <View style={[styles.assento, styles.assentoSelecionado]} />
          <Text style={styles.textoLegenda}>Selecionado</Text>
        </View>
        <View style={styles.itemLegenda}>
          <View style={[styles.assento, styles.assentoOcupado]} />
          <Text style={styles.textoLegenda}>Ocupado</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Forma de Pagamento:</Text>
      <View style={styles.pagamentoContainer}>
        {(['Pix', 'Cartão', 'Boleto'] as const).map((metodo) => (
          <Pressable
            key={metodo}
            style={[
              styles.opcaoPagamento,
              metodoPagamento === metodo && styles.opcaoPagamentoSelecionada,
            ]}
            onPress={() => setMetodoPagamento(metodo)}
          >
            <Text
              style={[
                styles.textoOpcaoPagamento,
                metodoPagamento === metodo && styles.textoOpcaoSelecionada,
              ]}
            >
              {metodo}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.resumoCard}>
        <Text style={styles.resumoTitulo}>Resumo do Pedido</Text>
        <Text style={styles.resumoTexto}>
          Assento Escolhido: <Text style={styles.destaque}>{assentoSelecionado || 'Nenhum'}</Text>
        </Text>
        <Text style={styles.resumoTexto}>
          Pagamento via: <Text style={styles.destaque}>{metodoPagamento}</Text>
        </Text>
        <Text style={styles.precoTotal}>Total: R$ 38,00</Text>
      </View>

      <Pressable style={styles.botaoConfirmar} onPress={confirmarPagamento}>
        <Text style={styles.textoBotaoConfirmar}>Finalizar Compra</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  textoBotaoVoltar: {
    fontWeight: 'bold',
    color: '#fff',
  },
  tituloTela: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: 20,
  },
  telaCinemaContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  telaCinemaBarra: {
    width: '80%',
    height: 6,
    backgroundColor: '#ffcc00',
    borderRadius: 4,
    marginBottom: 4,
  },
  textoTelaCinema: {
    color: '#888',
    fontSize: 12,
    letterSpacing: 2,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 10,
  },
  mapaAssentos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  assento: {
    width: 45,
    height: 45,
    backgroundColor: '#444',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assentoDisponivelExemplo: {
    backgroundColor: '#444',
  },
  assentoOcupado: {
    backgroundColor: '#e50914',
  },
  assentoSelecionado: {
    backgroundColor: '#00ff66',
  },
  textoAssento: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  legendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  itemLegenda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoLegenda: {
    color: '#ccc',
    fontSize: 12,
  },
  pagamentoContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  opcaoPagamento: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  opcaoPagamentoSelecionada: {
    borderColor: '#ffcc00',
    backgroundColor: '#332a00',
  },
  textoOpcaoPagamento: {
    color: '#bbb',
    fontWeight: '600',
  },
  textoOpcaoSelecionada: {
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  resumoCard: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 20,
  },
  resumoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  resumoTexto: {
    color: '#bbb',
    fontSize: 14,
    marginVertical: 2,
  },
  destaque: {
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  precoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff66',
    marginTop: 8,
  },
  botaoConfirmar: {
    backgroundColor: '#e50914',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  textoBotaoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});