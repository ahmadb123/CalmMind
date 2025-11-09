import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LikertScale from './LikertScale';  // ← Remove curly braces

function QuestionCard({ question, value, onAnswer, disabled = false }) {
  
  // Determine icon based on dimension
  const icon = question.dimension === 'ANXIETY' ? '💭' : '🛡️';
  
  return (
    <View style={styles.card}>
      
      {/* Header: Icon + Question Number */}
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.questionNumber}>
          Question {question.questionNumber}
        </Text>
      </View>
      
      {/* Question Text */}
      <Text style={styles.questionText}>
        "{question.questionText}"
      </Text>
      
      {/* Answer Scale */}
      <LikertScale
        value={value}
        onSelect={onAnswer}
        disabled={disabled}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
    marginBottom: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default QuestionCard;