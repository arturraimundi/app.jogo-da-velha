import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('X');
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(''));
  const [ganhador, setGanhador] = useState(null);

  const getTelaMenu = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Jogo da Velha </Text>
      <TouchableOpacity onPress={() => setTela('jogo')}>
        <Text style={styles.paragraph}>Iniciar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const verificarVencedor = (novoTabuleiro) => {
    const combinacoesVencedoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacao of combinacoesVencedoras) {
      const [a, b, c] = combinacao;
      if (novoTabuleiro[a] && novoTabuleiro[a] === novoTabuleiro[b] && novoTabuleiro[a] === novoTabuleiro[c]) {
        return novoTabuleiro[a];
      }
    }

    return null;
  };

  const handlePress = (index) => {
    
    if (tabuleiro[index] === '' && !ganhador) {
      const novoTabuleiro = [...tabuleiro];
      novoTabuleiro[index] = jogadorAtual;
      setTabuleiro(novoTabuleiro);

      const vencedor = verificarVencedor(novoTabuleiro);
      contador ++

      if ((vencedor) || contador >= 9) {
        if(contador >= 9){
          setGanhador('draw');
          setTela('ganhador');
        } else{
          setGanhador(vencedor);
          setTela('ganhador');
        }
      } else {
        setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    contador = 0
    setTabuleiro(Array(9).fill(''));
    setJogadorAtual('X');
    setGanhador(null);
    setTela('menu');
  };

  const getTelaJogo = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Jogador Atual: {jogadorAtual}</Text>
      <View style={styles.board}>
        {tabuleiro.map((valor, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{valor}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={resetGame}>
        <Text style={styles.paragraph}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const getTelaGanhador = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Ganhador: {ganhador}</Text>
      <TouchableOpacity onPress={resetGame}>
        <Text style={styles.paragraph}>Jogar Novamente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
    default:
      return getTelaMenu();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cell: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});
