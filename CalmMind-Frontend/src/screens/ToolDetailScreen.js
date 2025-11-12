// // import React, { useEffect, useState } from 'react';

// // // import {
// // //     View,
// // //     Text,
// // //     StyleSheet,
// // //     ScrollView,
// // //     ActivityIndicator,
// // //     TouchableOpacity,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import AppFooter from '../components/AppFooter';
// // // import {getAllToolFeatureTypes} from '../api/AnxietyReliefFeatureApi';
// // // import { audio } from 'expo-av';

// // function ToolDetailScreen({route, navigation}){
// //     // const {tool, user} = route.params;
// //     // const [isPlaying, setIsPlaying] = useState(false);
// //     // const [sound, setSound] = useState(null);
// //     // const [loading, setLoading] = useState(false);
// //     // const [features, setFeatures] = useState([]);
// //     // const playAudio = async () => {
// //     //     if(!tool.audioUrl) return;
// //     // }
// //     // setLoading(true);
// //     // try{
// //     //     if(sound){
// //     //         await sound.unloadAsync();
// //     //     }

// //     //     // load and play new sound :
// //     //     const {sound: newSound} = await audio.Sound.createAsync(
// //     //         {uri: tool.audioUrl},
// //     //         {shouldPlay: true}
// //     //     );
// //     //     setSound(newSound);
// //     //     setIsPlaying(true);

// //     //     // handle when audio finishes:
// //     //     newSound.setOnPlaybackStatusUpdate((status) => {
// //     //         if(status.didJustFinish){
// //     //             setIsPlaying(false);
// //     //         }
// //     //     });
// //     // }catch(error){
// //     //     console.error('Error playing audio:', error);
// //     // }finally{
// //     //     setLoading(false);
// //     // };

// //     // const stopAudio = async () => {
// //     //     if(sound){
// //     //         await sound.stopAsync();
// //     //         setIsPlaying(false);
// //     //     }
// //     // };

// //     // useEffect(() =>{
// //     //     return () => {
// //     //         if(sound){
// //     //             sound.unloadAsync();
// //     //         }
// //     //     };
// //     // }, [sound]);

// // }

// // export default ToolDetailScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Audio } from 'expo-av';

// function ToolDetailScreen({ route, navigation }) {
//   const { tool, user } = route.params;

//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [loadingAudio, setLoadingAudio] = useState(false);

//   const playAudio = async () => {
//     if (!tool.audioUrl) return;

//     setLoadingAudio(true);

//     try {
//       // Unload previous sound if any
//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }

//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: tool.audioUrl },
//         { shouldPlay: true }
//       );

//       setSound(newSound);
//       setIsPlaying(true);

//       newSound.setOnPlaybackStatusUpdate((status) => {
//         if (status.didJustFinish) {
//           setIsPlaying(false);
//         }
//       });
//     } catch (err) {
//       console.error('Audio play error:', err);
//     } finally {
//       setLoadingAudio(false);
//     }
//   };

//   const stopAudio = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       setIsPlaying(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={styles.backButton}>← Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.featureName}>{tool.featureName}</Text>
//       <Text style={styles.description}>{tool.description}</Text>
//       <Text style={styles.content}>{tool.content}</Text>
//       <Text style={styles.duration}>🕒 {tool.duration} min</Text>

//       <TouchableOpacity
//         style={styles.audioButton}
//         onPress={isPlaying ? stopAudio : playAudio}
//         disabled={loadingAudio}
//       >
//         <Text style={styles.audioButtonText}>
//           {loadingAudio
//             ? 'Loading...'
//             : isPlaying
//             ? '⏹ Stop Audio'
//             : '▶️ Play Audio'}
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F1FAEE',
//     padding: 20,
//   },
//   backButton: {
//     fontSize: 16,
//     color: '#457B9D',
//     marginBottom: 20,
//   },
//   featureName: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#1D3557',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 15,
//   },
//   content: {
//     fontSize: 15,
//     color: '#333',
//     marginBottom: 20,
//     lineHeight: 22,
//   },
//   duration: {
//     fontSize: 14,
//     color: '#999',
//     marginBottom: 30,
//   },
//   audioButton: {
//     backgroundColor: '#457B9D',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   audioButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudioPlayer } from 'expo-audio'; // ✅ Only import useAudioPlayer

function ToolDetailScreen({ route, navigation }) {
  const { tool, user } = route.params;

  // ✅ Pass URL directly to hook (no AudioSource needed)
  const player = useAudioPlayer(tool?.audioUrl || null);

  const playAudio = () => {
    if (!tool?.audioUrl) {
      Alert.alert('No Audio', 'This tool does not have audio');
      return;
    }

    try {
      console.log('Playing audio:', tool.audioUrl);
      player.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Error', `Could not play audio: ${error.message}`);
    }
  };

  const pauseAudio = () => {
    try {
      player.pause();
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };

  const getFeatureIcon = (featureType) => {
    const iconMap = {
      'BREATHING': '🫁',
      'MEDITATION': '🧘',
      'PROGRESSIVE_MUSCLE_RELAXATION': '💪',
      'GROUNDING': '🌍',
      'JOURNALING': '✍️',
      'AFFIRMATIONS': '💬',
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

        {/* Content/Instructions */}
        <View style={styles.contentSection}>
          <Text style={styles.contentTitle}>Instructions:</Text>
          <Text style={styles.content}>
            {tool.content || 'No instructions available'}</Text>
        </View>

        {/* Audio Player (if audio exists) */}
        {tool.audioUrl && (
          <View style={styles.audioSection}>
            <Text style={styles.audioTitle}>🎧 Guided Audio</Text>
            <Text style={styles.audioSubtitle}>
              Listen to the complete guided exercise
            </Text>
            
            <TouchableOpacity
              style={[
                styles.audioButton,
                player.playing && styles.audioButtonPlaying
              ]}
              onPress={player.playing ? pauseAudio : playAudio}
            >
              <Text style={styles.audioButtonText}>
                {player.playing ? '⏸️ Pause Audio' : '▶️ Play Audio'}
              </Text>
            </TouchableOpacity>

            {/* Debug - Remove later */}
            <Text style={styles.debugText}>
              Status: {player.playing ? 'Playing' : 'Paused'}
            </Text>
          </View>
        )}

        {/* Start Button for non-audio tools */}
        {!tool.audioUrl && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              Alert.alert('Interactive Tool', 'Follow the instructions above');
            }}
          >
            <Text style={styles.startButtonText}>✅ Start Exercise</Text>
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