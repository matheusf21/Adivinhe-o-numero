import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native';

const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    setTargetNumber(randomNum);
    setGuess('');
    setFeedback('');
    setAttempts(5);
    setGameOver(false);
  };

  const checkGuess = () => {
    const numGuess = parseInt(guess);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 20) {
      Alert.alert('Número inválido', 'Digite um número entre 1 e 20. Seu Burro!');
      return;
    }

    if (numGuess === targetNumber) {
      setFeedback(`🎉 Parabéns! Você acertou o número ${targetNumber}!`);
      setGameOver(true);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      if (newAttempts === 0) {
        setFeedback(`😢 Você perdeu! O número era ${targetNumber}.`);
        setGameOver(true);
      } else {
        setFeedback(numGuess < targetNumber ? '🔼 O número é maior!' : '🔽 O número é menor!');
      }
    }

    setGuess('');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0d0d0d" barStyle="light-content" />
      <Text style={styles.title}>🔢 Jogo da Adivinhação</Text>

      <Text style={styles.subtitle}>Tente adivinhar o número entre 1 e 20</Text>
      <Text style={styles.attempts}>Tentativas restantes: <Text style={{ color: '#00FFC2' }}>{attempts}</Text></Text>

      {!gameOver && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu número"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={guess}
            onChangeText={setGuess}
          />
          <TouchableOpacity style={styles.button} onPress={checkGuess}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        </View>
      )}

      {feedback !== '' && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{feedback}</Text>
        </View>
      )}

      {gameOver && (
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={startNewGame}>
          <Text style={styles.buttonText}>🔄 Jogar Novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 10,
  },
  attempts: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    color: '#FFF',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#00FFC2',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 25,
    backgroundColor: '#FF5C5C',
  },
  feedbackContainer: {
    marginTop: 25,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  feedback: {
    color: '#FFD700',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default NumberGuessingGame;
