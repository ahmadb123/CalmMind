import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AudioPlayer from '../components/AudioPlayer'; // ✅ use your component

function ToolDetailScreen({ route, navigation }) {
  const { tool, user } = route.params;

  const getFeatureIcon = (featureType) => {
    const iconMap = {
      BREATHING: '🫁',
      MEDITATION: '🧘',
      PROGRESSIVE_MUSCLE_RELAXATION: '💪',
      GROUNDING: '🌍',
      JOURNALING: '✍️',
      AFFIRMATIONS: '💬',
    };
    return iconMap[featureType] || '🌿';
  };

  if (!tool) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Tool not found</Text>
          <TouchableOpacity 
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Tool Icon & Title */}
        <View style={styles.titleSection}>
          <Text style={styles.icon}>{getFeatureIcon(tool.featureType)}</Text>
          <Text style={styles.title}>{tool.featureName}</Text>
          <Text style={styles.description}>{tool.description}</Text>
        </View>

        {/* Info Badges */}
        <View style={styles.badges}>
          {tool.audioUrl && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🎧 Audio Guide</Text>
            </View>
          )}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱️ {tool.duration} min</Text>
          </View>
          {tool.category !== 'GENERAL' && (
            <View style={[styles.badge, styles.personalizedBadge]}>
              <Text style={styles.badgeText}>✨ Personalized</Text>
            </View>
          )}
        </View>

        {/* Instructions */}
        <View style={styles.contentSection}>
          <Text style={styles.contentTitle}>Instructions:</Text>
          <Text style={styles.content}>
            {tool.content || 'No instructions available'}
          </Text>
        </View>

        {/* 🎧 Audio Player Component */}
        {tool.audioUrl && (
          <AudioPlayer 
            source={tool.audioUrl}
            title="Guided Audio Exercise"
          />
        )}

        {/* If NO audio → show default button */}
        {!tool.audioUrl && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => Alert.alert('Start Exercise', 'Follow the instructions above.')}
          >
            <Text style={styles.startButtonText}>Start Exercise</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FAEE',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#E63946',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#457B9D',
    marginBottom: 20,
    fontWeight: '600',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 64,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 25,
},
badge: {
    backgroundColor: '#E1F5FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginHorizontal: 4,  // ✅ Use margins instead of gap
    marginVertical: 4,
},
  personalizedBadge: {
    backgroundColor: '#FFE8F0',
  },
  badgeText: {
    fontSize: 13,
    color: '#457B9D',
    fontWeight: '500',
  },
  contentSection: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 12,
  },
  content: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  audioSection: {
    backgroundColor: '#457B9D',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  audioTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
  },
  audioSubtitle: {
    fontSize: 14,
    color: '#E1F5FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  audioButton: {
    backgroundColor: '#1D3557',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    minWidth: 220,
    alignItems: 'center',
  },
  audioButtonPlaying: {
    backgroundColor: '#E63946',
  },
  audioButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  debugText: {
    marginTop: 10,
    fontSize: 12,
    color: '#FFF',
    opacity: 0.8,
  },
  startButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  backButtonContainer: {
    backgroundColor: '#457B9D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ToolDetailScreen;