import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { fetchQuiz, submitQuiz } from '../api/QuizApi';

function QuizScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Load quiz questions once on mount
  useEffect(() => {
    async function loadQuiz() {
      try {
        const data = await fetchQuiz();
        setQuizData(data);
      } catch (err) {
        setError(err.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, []);

  // 🔹 Save user’s selected answer
  const handleAnswer = (value) => {
    setAnswers({ ...answers, [quizData[index]?.id]: value });
  };

  // 🔹 Navigate next / previous
  const handleNext = async () => {
    const lastQuestion = index === quizData.length - 1;
    if (lastQuestion) {
      // Prepare formatted answers for backend
      const payload = Object.entries(answers).map(([questionId, questionAnswer]) => ({
        questionId: Number(questionId),
        questionAnswer,
      }));

      try {
        await submitQuiz(payload);
        Alert.alert('Quiz Completed', 'Your responses have been submitted!');
        navigation.navigate('QuizResult'); // or home / result screen
      } catch (err) {
        Alert.alert('Error', 'Failed to submit quiz');
      }
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  // 🔹 Loading & error states
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4FD1C5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const current = quizData[index];

  return (
    <SafeAreaView style={styles.container}>
    <ProgressBar current={Object.keys(answers).length} total={quizData.length} />
      {current && (
        <QuestionCard
          question={current}
          questionNumber={index + 1}
          total={quizData.length}
          answer={answers[current.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFA', paddingTop: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
});

export default QuizScreen;
