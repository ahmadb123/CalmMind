import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppFooter from '../components/AppFooter';
import { fetchPartnerStyleQuizQuestions, submitPartnerStyleQuiz } from '../api/PartnerQuizApi';
import ProgressBar from '../components/ProgressBar';

function PartnerQuizScreen({ route, navigation }) {
  const { user } = route.params || {};

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const scores = [1, 2, 3];

  useEffect(() => {
    loadQuiz();
  }, []);

  /* ===================== LOAD QUIZ ===================== */

  const loadQuiz = async () => {
    try {
      const data = await fetchPartnerStyleQuizQuestions();
      if (!data || data.length === 0) {
        setError(true);
      } else {
        setQuiz(data);
      }
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== NAV ===================== */

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  /* ===================== ANSWERS ===================== */

  const handleAnswer = value => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: value,
    }));
  };

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async () => {
    // ensure all answered
    for (let i = 0; i < quiz.length; i++) {
      if (!answers[i]) {
        Alert.alert('Incomplete', 'Please answer all questions before submitting.');
        return;
      }
    }

    const payload = [];
    for (let i = 0; i < quiz.length; i++) {
      payload.push({
        questionId: quiz[i].questionId,
        answerValue: answers[i],
      });
    }

    try {
      await submitPartnerStyleQuiz(user?.id, payload);
      navigation.replace('PartnerStyleScreen', { user });
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to submit quiz.');
    }
  };

  /* ===================== STATES ===================== */

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#457B9D" />
      </SafeAreaView>
    );
  }

  if (err || quiz.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>No quiz available.</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = quiz[currentIndex];
  const isLast = currentIndex === quiz.length - 1;

  /* ===================== UI ===================== */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressBar
          currentQuestion={currentIndex + 1}
          totalQuestions={quiz.length}
        />

        {/* GROUP */}
        <View style={styles.groupContainer}>
          <Text style={styles.groupText}>{currentQuestion.group}</Text>
        </View>

        {/* QUESTION */}
        <ScrollView style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestion.questionNum}. {currentQuestion.questionText}
          </Text>

          {currentQuestion.descriptions.map((d, i) => (
            <Text key={i} style={styles.description}>
              • {d}
            </Text>
          ))}
        </ScrollView>

        {/* SCORES */}
        <View style={styles.scoreButtons}>
          {scores.map(score => (
            <TouchableOpacity
              key={score}
              onPress={() => handleAnswer(score)}
              style={[
                styles.scoreButton,
                answers[currentIndex] === score && styles.scoreButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.scoreText,
                  answers[currentIndex] === score && styles.scoreTextActive,
                ]}
              >
                {score}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NAV BUTTONS */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            style={[styles.navBtn, currentIndex === 0 && styles.disabled]}
          >
            <Text>Back</Text>
          </TouchableOpacity>

          {!isLast ? (
            <TouchableOpacity
              onPress={handleNext}
              disabled={!answers[currentIndex]}
              style={[styles.navBtn, !answers[currentIndex] && styles.disabled]}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.navBtn, styles.submitBtn]}
            >
              <Text style={{ color: '#FFF' }}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <AppFooter navigation={navigation} />
    </SafeAreaView>
  );
}

export default PartnerQuizScreen;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#E63946' },

  groupContainer: { alignItems: 'center', marginBottom: 10 },
  groupText: { fontSize: 18, fontWeight: '700', color: '#1D3557' },

  questionContainer: { marginBottom: 20 },
  questionText: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  description: { fontSize: 14, color: '#555', marginBottom: 6 },

  scoreButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  scoreButton: {
    borderWidth: 2,
    borderColor: '#457B9D',
    padding: 16,
    borderRadius: 12,
    width: 70,
    alignItems: 'center',
  },
  scoreButtonActive: { backgroundColor: '#457B9D' },
  scoreText: { fontSize: 16 },
  scoreTextActive: { color: '#FFF' },

  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#A8DADC',
  },
  submitBtn: {
    backgroundColor: '#457B9D',
  },
  disabled: {
    opacity: 0.4,
  },
});
