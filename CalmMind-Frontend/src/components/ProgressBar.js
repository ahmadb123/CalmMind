import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Question {current} / {total}</Text>
        <Text style={styles.label}>{Math.round(progress)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.bar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, color: '#555' },
  track: { height: 6, backgroundColor: '#e6e6e6', borderRadius: 3 },
  bar: { height: 6, backgroundColor: '#4FD1C5', borderRadius: 3 },
});

export default ProgressBar;
