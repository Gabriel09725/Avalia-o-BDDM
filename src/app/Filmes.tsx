import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

type Filme = {
  id: string;
  titulo: string;
  genero: string;
  duracao: string;
  classificacao: string;
  cartaz: string;
};

export default function ListaFilmes() {
  const router = useRouter();

  const filmes: Filme[] = [
    { 
      id: '1', 
      titulo: 'O Poderoso Chefão', 
      genero: 'Crime/Ficção Policial', 
      duracao: '175 min', 
      classificacao: '14 anos',
      cartaz: 'https://img.cdndsgni.com/preview/10236769.jpg'
    },
    { 
      id: '2', 
      titulo: 'Vingadores: Ultimato', 
      genero: 'Ação/Ficção Científica', 
      duracao: '185 min', 
      classificacao: '12 anos',
      cartaz: 'https://static.wikia.nocookie.net/universocinematograficomarvel/images/b/b7/Images.jpg/revision/latest?cb=20190505233213&path-prefix=pt'
    },
    { 
      id: '3', 
      titulo: 'Interestelar', 
      genero: 'Ficção Científica/Aventura', 
      duracao: '169 min', 
      classificacao: '10 anos',
      cartaz: 'https://static.wikia.nocookie.net/dublagem/images/e/ec/Interestelar.jpg/revision/latest?cb=20240315155250&path-prefix=pt-br'
    },
    { 
      id: '4', 
      titulo: 'A Viagem de Chihiro', 
      genero: 'Fantasia/Aventura', 
      duracao: '125 min', 
      classificacao: 'Livre',
      cartaz: 'https://image.tmdb.org/t/p/original/hhoKhsyJ3hFaxEm5pMdZRiTu2lJ.jpg'
    },
    { 
      id: '5', 
      titulo: 'Batman: O Cavaleiro das Trevas', 
      genero: 'Ação/Crime', 
      duracao: '152 min', 
      classificacao: '14 anos',
      cartaz: 'https://rollingstone.com.br/wp-content/uploads/legacy/2012/img-1006840-batman-o-cavaleiro-das-trevas-ressurge.jpg'
    },
    { 
      id: '6', 
      titulo: 'Parasita', 
      genero: 'Thriller/Comédia', 
      duracao: '132 min', 
      classificacao: '16 anos',
      cartaz: 'https://image.tmdb.org/t/p/original/bik2BZjmVjeE6LOZqtuTjb4jJPQ.jpg'
    },
    { 
      id: '7', 
      titulo: 'Toy Story 4', 
      genero: 'Infantil/Aventura', 
      duracao: '100 min', 
      classificacao: 'Livre',
      cartaz: 'https://image.tmdb.org/t/p/w1280/csiyO6q8rR74pfgJDjwINzhoick.jpg'
    },
    { 
      id: '8', 
      titulo: 'Matrix', 
      genero: 'Ação/Ficção científica', 
      duracao: '136 min', 
      classificacao: '14 anos',
      cartaz: 'https://image.tmdb.org/t/p/w1280/lDqMDI3xpbB9UQRyeXfei0MXhqb.jpg'
    },
    { 
      id: '9', 
      titulo: 'Gladiador', 
      genero: 'Ação/Aventura', 
      duracao: '155 min', 
      classificacao: '14 anos',
      cartaz: 'https://image.tmdb.org/t/p/w1280/4DUClyGA6OqjXv6yC0Imf6THGfp.jpg'
    },
    { 
      id: '10', 
      titulo: 'O Senhor dos Anéis: O Retorno do Rei', 
      genero: 'Fantasia/Aventura', 
      duracao: '201 min', 
      classificacao: '14 anos',
      cartaz: 'https://www.europanet.com.br/upload/id_produto/107___/107520g.jpg'
    },
  ];

  const renderItem = ({ item }: { item: Filme }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.cartaz }} 
        style={styles.cartaz} 
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.tituloFilme}>{item.titulo}</Text>
        <Text style={styles.texto}>Gênero: {item.genero}</Text>
        <Text style={styles.texto}>Duração: {item.duracao}</Text>
        <Text style={styles.classificacao}>Classificação: {item.classificacao}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotaoVoltar}>← Voltar ao Menu</Text>
      </Pressable>

      <Text style={styles.tituloTela}>Filmes em Cartaz</Text>

      <FlatList
        data={filmes}
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
    height: 115,
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
    fontSize: 13,
    color: '#bbb',
    marginBottom: 2,
  },
  classificacao: {
    fontSize: 13,
    color: '#ff5555',
    marginTop: 4,
    fontWeight: '600',
  },
});