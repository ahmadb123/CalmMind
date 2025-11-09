import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LikertScale from './LikertScale';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  total, 
  answer, 
  onAnswer, 
  onNext, 
  onPrev 
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {questionNumber}. {question.questionText}
      </Text>

      <LikertScale value={answer} onChange={onAnswer} />

      <View style={styles.nav}>
        <TouchableOpacity 
          onPress={onPrev} 
          disabled={questionNumber === 1}
          style={[styles.btn, styles.backBtn, questionNumber === 1 && styles.disabled]}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onNext} 
          disabled={!answer}
          style={[styles.btn, styles.nextBtn, !answer && styles.disabled]}
        >
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    width: '95%',
    alignSelf: 'center'
  },
  text: { 
    fontSize: 17, 
    color: '#222', 
    textAlign: 'center', 
    marginBottom: 18, 
    lineHeight: 24 
  },
  nav: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12
  },
  backBtn: { backgroundColor: '#f2f2f2' },
  nextBtn: { backgroundColor: '#4FD1C5' },
  backText: { color: '#555', fontWeight: '500' },
  nextText: { color: 'white', fontWeight: '600' },
  disabled: { opacity: 0.5 }
});

export default QuestionCard;
