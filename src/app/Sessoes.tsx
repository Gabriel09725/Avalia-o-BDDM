import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

type Sessao = {
  id: string;
  filme: string;
  horario: string;
  tipo: '2D' | '3D' | 'VIP';
  preco: string;
  cartaz: string;
};

export default function ListaSessoes() {
  const router = useRouter();

  const sessoes: Sessao[] = [
    {
      id: '1',
      filme: 'O Poderoso Chefão',
      horario: '14:00',
      tipo: '2D',
      preco: 'R$ 25,00',
      cartaz: 'https://img.cdndsgni.com/preview/10236769.jpg'
    },
    {
      id: '2',
      filme: 'Vingadores: Ultimato',
      horario: '16:30',
      tipo: '3D',
      preco: 'R$ 38,00',
      cartaz: 'https://static.wikia.nocookie.net/universocinematograficomarvel/images/b/b7/Images.jpg/revision/latest?cb=20190505233213&path-prefix=pt'
    },
    {
      id: '3',
      filme: 'Interestelar',
      horario: '19:00',
      tipo: 'VIP',
      preco: 'R$ 55,00',
      cartaz: 'https://static.wikia.nocookie.net/dublagem/images/e/ec/Interestelar.jpg/revision/latest?cb=20240315155250&path-prefix=pt-br'
    },
    {
      id: '4',
      filme: 'A Viagem de Chihiro',
      horario: '13:00',
      tipo: '2D',
      preco: 'R$ 20,00',
      cartaz: 'https://image.tmdb.org/t/p/original/hhoKhsyJ3hFaxEm5pMdZRiTu2lJ.jpg'
    },
    {
      id: '5',
      filme: 'Batman: O Cavaleiro das Trevas',
      horario: '21:00',
      tipo: '3D',
      preco: 'R$ 45,00',
      cartaz: 'https://rollingstone.com.br/wp-content/uploads/legacy/2012/img-1006840-batman-o-cavaleiro-das-trevas-ressurge.jpg'
    },
    {
      id: '6',
      filme: 'Parasita',
      horario: '22:15',
      tipo: 'VIP',
      preco: 'R$ 60,00',
      cartaz: 'https://image.tmdb.org/t/p/original/bik2BZjmVjeE6LOZqtuTjb4jJPQ.jpg'
    },
    {
      id: '7',
      filme: 'Toy Story 4',
      horario: '11:30',
      tipo: '2D',
      preco: 'R$ 22,00',
      cartaz: 'https://image.tmdb.org/t/p/w1280/csiyO6q8rR74pfgJDjwINzhoick.jpg'
    },
    {
      id: '8',
      filme: 'Matrix',
      horario: '18:15',
      tipo: '3D',
      preco: 'R$ 40,00',
      cartaz: 'https://image.tmdb.org/t/p/w1280/lDqMDI3xpbB9UQRyeXfei0MXhqb.jpg'
    },
    {
      id: '9',
      filme: 'Gladiador',
      horario: '15:45',
      tipo: 'VIP',
      preco: 'R$ 50,00',
      cartaz: 'https://image.tmdb.org/t/p/w1280/4DUClyGA6OqjXv6yC0Imf6THGfp.jpg'
    },
    {
      id: '10',
      filme: 'O Senhor dos Anéis: O Retorno do Rei',
      horario: '17:00',
      tipo: 'VIP',
      preco: 'R$ 55,00',
      cartaz: 'https://www.europanet.com.br/upload/id_produto/107___/107520g.jpg'
    },
  ];

  const irParaPagamento = (item: Sessao) => {
    router.push({
      pathname: '/Pagamento' as any, 
      params: { 
        filme: item.filme, 
        preco: item.preco,
        horario: item.horario,
        tipo: item.tipo
      },
    });
  };

  const renderItem = ({ item }: { item: Sessao }) => {
    return (
      <Pressable 
        style={styles.card} 
        onPress={() => irParaPagamento(item)}
      >
        <Image 
          source={{ uri: item.cartaz }} 
          style={styles.cartaz} 
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.tituloFilme}>{item.filme}</Text>
          <Text style={styles.texto}>Horário: {item.horario}</Text>
          <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
          <Text style={styles.preco}>Preço: {item.preco}</Text>
          
          <View style={styles.botaoComprar}>
            <Text style={styles.textoBotaoComprar}>Selecionar Assento →</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotaoVoltar}>← Voltar ao Menu</Text>
      </Pressable>

      <Text style={styles.tituloTela}>Sessões</Text>

      <FlatList
        data={sessoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#111',
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    marginLeft: 20,
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
    marginBottom: 15,
  },
  listaContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    width: '90%',
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
  },
  cartaz: {
    width: 80,
    height: 110,
    borderRadius: 6,
    marginRight: 14,
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tituloFilme: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  texto: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 2,
  },
  tipo: {
    fontSize: 13,
    color: '#00ccff',
    fontWeight: '600',
    marginBottom: 4,
  },
  preco: {
    fontSize: 15,
    color: '#00ff66',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  botaoComprar: {
    backgroundColor: '#e50914',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  textoBotaoComprar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
});