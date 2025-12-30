import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppFooter from '../components/AppFooter';
import { fetchPartnerStyleQuizQuestions } from '../api/PartnerQuizApi';

function PartnerStyleScreen({ navigation }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await fetchPartnerStyleQuizQuestions();
      if (!data || data.length === 0) {
        setResults(null);
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
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

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          Something went wrong. Please try again later.
        </Text>
      </SafeAreaView>
    );
  }

  /* ===================== NO QUIZ YET ===================== */

  if (!results) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Partner Attachment Style</Text>

          <Text style={styles.subtitle}>
            Learn how your partner typically behaves in relationships and
            how it may affect communication, closeness, and conflict.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              This quiz helps you better understand your partner’s emotional
              patterns — not to label them, but to improve connection.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('PartnerQuiz')}
          >
            <Text style={styles.primaryButtonText}>
              Start Partner Quiz →
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <AppFooter navigation={navigation} />
      </SafeAreaView>
    );
  }

  /* ===================== RESULTS ===================== */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Partner’s Style</Text>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Attachment Style</Text>
          <Text style={styles.resultStyle}>{results.style}</Text>

          <Text style={styles.resultDescription}>
            {results.description || 
              'Understanding this style can help you respond with empathy and clarity.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('PartnerQuiz')}
        >
          <Text style={styles.secondaryButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
      </ScrollView>

      <AppFooter navigation={navigation} />
    </SafeAreaView>
  );
}

export default PartnerStyleScreen;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 14,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#457B9D',
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#457B9D',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
  },
  resultCard: {
    backgroundColor: '#D4F1F4',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#A8DADC',
  },
  resultLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  resultStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  resultDescription: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  secondaryButton: {
    backgroundColor: '#A8DADC',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
  },
  errorText: {
    fontSize: 16,
    color: '#E63946',
    textAlign: 'center',
  },
});
