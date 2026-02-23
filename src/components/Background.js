import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

/**
 * Dark space background with subtle radial glows.
 * Pure React Native implementation (no external gradient library needed).
 * For true gradient support, install react-native-linear-gradient and uncomment below.
 */
const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Ambient glow orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg1,
  },
  orb1: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(0, 212, 255, 0.04)',
  },
  orb2: {
    position: 'absolute',
    top: 200,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(123, 97, 255, 0.05)',
  },
  orb3: {
    position: 'absolute',
    bottom: 100,
    left: 30,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 184, 0, 0.03)',
  },
});

export default Background;