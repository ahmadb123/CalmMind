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
import { getPartnerStyleQuizResults } from '../api/PartnerQuizApi';

function PartnerStyleScreen({ route, navigation }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { user } = route.params || {};

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await getPartnerStyleQuizResults(user?.id);
      if (!data) {
        navigation.replace('PartnerQuizScreen', { user });
        return;
      }
      setResults(data);
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

  const dataFilter = Object.entries(results?.groupScores ?? {});
  
  // Get first 150 characters as preview
  const descriptionPreview = results?.scoringKeyDesc?.substring(0, 150) + '...';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Partner's Attachment Style</Text>

        {/* Main Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.dominantStyle}>
            {results?.dominantGroup}
          </Text>
          <Text style={styles.resultLabel}>Dominant Attachment Style</Text>
        </View>

        {/* Score Breakdown */}
        <View style={styles.scoresCard}>
          <Text style={styles.scoresTitle}>Score Breakdown</Text>
          {dataFilter.map(([group, score]) => (
            <View key={group} style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>{group}</Text>
              <View style={styles.scoreBarContainer}>
                <View 
                  style={[
                    styles.scoreBar, 
                    { width: `${(score / 30) * 100}%` }
                  ]} 
                />
                <Text style={styles.scoreText}>{score}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Description Card with Expand/Collapse */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Understanding This Style</Text>
          
          <Text style={styles.descriptionText}>
            {showFullDescription 
              ? results?.scoringKeyDesc 
              : descriptionPreview
            }
          </Text>

          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => setShowFullDescription(!showFullDescription)}
          >
            <Text style={styles.readMoreText}>
              {showFullDescription ? '▲ Show Less' : '▼ Read More'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('PartnerQuizScreen', { user })}
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
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#457B9D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dominantStyle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#457B9D',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 15,
  },
  scoreRow: {
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  scoreBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    height: 24,
    position: 'relative',
  },
  scoreBar: {
    backgroundColor: '#457B9D',
    height: '100%',
    borderRadius: 8,
    minWidth: 30,
  },
  scoreText: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  descriptionCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F4A261',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#457B9D',
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