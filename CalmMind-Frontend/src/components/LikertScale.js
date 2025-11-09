import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

/*
this page is responsible to display emojis disagree -> strongly agree
*/

function LikertScale({ value, onSelect, disabled }) {
    // 7-points scale with emojis and labels
    const scalePoints = [
        { value: 1, label: 'Strongly Disagree', emoji: '😠' },
        { value: 2, label: 'Disagree', emoji: '😞' },
        { value: 3, label: 'Somewhat Disagree', emoji: '😕' },
        { value: 4, label: 'Neutral', emoji: '😐' },
        { value: 5, label: 'Somewhat Agree', emoji: '🙂' },
        { value: 6, label: 'Agree', emoji: '😊' },
        { value: 7, label: 'Strongly Agree', emoji: '😍' },
    ];
    // handle selection of a scale point
    const handlePress = (selectedValue) => {
        if(!disabled){
            // add haptic feedback when user taps on emoji
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
            onSelect(selectedValue);
        }
    };

return (
    <View style={styles.container}>
        <View style={styles.emojiRow}>
            {scalePoints.map((point) => {
                const isSelected = point.value === value;
                
                return (
                    <TouchableOpacity
                        key={point.value}
                        onPress={() => handlePress(point.value)}
                        disabled={disabled}
                        style={[
                            styles.emojiButton,
                            isSelected && styles.selectedButton,
                            disabled && styles.disabledButton,
                        ]}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.emojiText,
                            isSelected && styles.selectedEmoji,
                            !isSelected && styles.unselectedEmoji,
                        ]}>
                            {point.emoji}
                        </Text>
                        
                        {/* REMOVED: Individual label */}
                    </TouchableOpacity>
                );
            })}
        </View>
        
        <View style={styles.labelsRow}>
            <Text style={styles.endpointLabel}>Strongly{'\n'}Disagree</Text>
            <Text style={styles.endpointLabel}>Strongly{'\n'}Agree</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  emojiButton: {
    width: 40,
    height: 40, 
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#A8DADC',
    borderColor: '#457B9D',
    transform: [{ scale: 1.2 }],  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.4,
  },
  emojiText: {
    fontSize: 24,
  },
  selectedEmoji: {
    fontSize: 28,
  },
  unselectedEmoji: {
    opacity: 0.5,
  },
  // Remove selectedLabel style completely
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 5,
  },
  endpointLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default LikertScale;