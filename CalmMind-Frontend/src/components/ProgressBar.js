import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

function ProgressBar({ currentQuestion, totalQuestions }) {
  const questionsLeft = totalQuestions - currentQuestion;  
  const percentage = (currentQuestion / totalQuestions) * 100;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // Animate progress when percentage changes
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Text style={styles.currentQuestionText}>
        Question {currentQuestion} of {totalQuestions}
      </Text>

      {/* Progress Bar Background */}
      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F5F5F5',
  },
  currentQuestionText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  barBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#A8DADC',
    borderRadius: 5,
  },
});

export default ProgressBar;