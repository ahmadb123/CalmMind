import React, { useState, useEffect } from 'react';  // ← Add useState
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchRandomAffirmation } from '../api/AffirmationApi';  // ← Fixed typo

function HomeScreen({ route, navigation }) {
  const { user } = route.params || {};
  
  // ← ADD THIS STATE
  const [affirmation, setAffirmation] = useState("You are worthy of love and belonging.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAffirmation();
  }, []);

  const loadAffirmation = async () => {
    setLoading(true);
    
    try {
      const data = await fetchRandomAffirmation();
      setAffirmation(data.message);  // ← UPDATE STATE HERE
    } catch (error) {
      console.error('Error fetching affirmation:', error);
      setAffirmation("You are worthy of love and belonging.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi, {user?.username}! 👋</Text>
            <Text style={styles.subGreeting}>Welcome to CalmMind 🌿</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings', { user })}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* DAILY AFFIRMATION CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Affirmation 🌿</Text>
            
            {loading ? (
              <ActivityIndicator size="large" color="#A8DADC" style={{ marginVertical: 20 }} />
            ) : (
              <Text style={styles.affirmation}>"{affirmation}"</Text>
            )}
            
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={loadAffirmation}  // ← Just pass function reference
              disabled={loading}
            >
              <Text style={styles.refreshText}>
                {loading ? 'Loading...' : '🔄 New Affirmation'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quiz Card */}
          <TouchableOpacity 
            style={styles.quizCard}
            onPress={() => navigation.navigate('Quiz', { user })}
            activeOpacity={0.8}
          >
            <Text style={styles.quizIcon}>❓</Text>
            <Text style={styles.quizQuestion}>Don't know your style?</Text>
            <Text style={styles.quizTitle}>📋 Take the Quiz</Text>
            <Text style={styles.quizSubtitle}>Discover your attachment pattern</Text>
            <View style={styles.quizButton}>
              <Text style={styles.quizButtonText}>Start Quiz →</Text>
            </View>

          </TouchableOpacity>
        </View>

        {/* Quick Help */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.quickHelpTitle}>Quick Help</Text>
        </View>

        <View style={styles.quickHelpGrid}>
          <TouchableOpacity
            style={[styles.quickHelpBox, styles.anxietyBox]}
            onPress={() => alert('Anxiety Relief - Coming Soon')}
          >
            <Text style={styles.quickHelpIcon}>💭</Text>
            <Text style={styles.quickHelpText}>Anxiety Relief</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickHelpBox, styles.calmBox]}
            onPress={() => alert('Calm Down - Coming Soon')}
          >
            <Text style={styles.quickHelpIcon}>🧘‍♂️</Text>
            <Text style={styles.quickHelpText}>Calm Down</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickHelpBox, styles.styleBox]}
            onPress={() => alert('Understand My Style - Coming Soon')}
          >
            <Text style={styles.quickHelpIcon}>🔍</Text>
            <Text style={styles.quickHelpText}>My Style</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickHelpBox, styles.partnerBox]}
            onPress={() => alert('Partner Help - Coming Soon')}
          >
            <Text style={styles.quickHelpIcon}>❤️</Text>
            <Text style={styles.quickHelpText}>Partner Help</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A8DADC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A8DADC',
    paddingBottom: 30,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 28,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  affirmation: {
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
    lineHeight: 28,
    marginVertical: 20,
    fontStyle: 'italic',
  },
  refreshButton: {
    backgroundColor: '#A8DADC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
    quizCard: {
    backgroundColor: '#E8D5E8',  // Light lavender
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#D8BFD8',
  },
  quizIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  quizQuestion: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  quizButton: {
    backgroundColor: '#A8DADC',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quizButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
   quickHelpTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickHelpBox: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickHelpIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  quickHelpText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  anxietyBox: {
    backgroundColor: '#FFE5E5',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  calmBox: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#42A5F5',
  },
  styleBox: {
    backgroundColor: '#F3E5F5',
    borderWidth: 2,
    borderColor: '#AB47BC',
  },
  partnerBox: {
    backgroundColor: '#FFE8E8',
    borderWidth: 2,
    borderColor: '#E91E63',
  },
});