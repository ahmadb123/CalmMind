import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LikertScale = ({ value, onChange }) => {
  const options = [1, 2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>Strongly{"\n"}Disagree</Text>
        <Text style={styles.label}>Neutral</Text>
        <Text style={styles.label}>Strongly{"\n"}Agree</Text>
      </View>

      <View style={styles.row}>
        {options.map(num => (
          <TouchableOpacity
            key={num}
            onPress={() => onChange(num)}
            style={[
              styles.circle,
              value === num && styles.selectedCircle
            ]}
          >
            <Text style={[styles.number, value === num && styles.selectedNumber]}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  labels: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 6 },
  label: { fontSize: 11, color: '#666', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '90%' },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  selectedCircle: {
    backgroundColor: '#4FD1C5',
    borderColor: '#4FD1C5',
    transform: [{ scale: 1.1 }]
  },
  number: { color: '#666', fontWeight: '500' },
  selectedNumber: { color: '#fff' }
});

export default LikertScale;
