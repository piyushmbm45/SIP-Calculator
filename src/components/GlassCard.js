import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const GlassCard = ({ children, style, strong = false, glow = false }) => {
  return (
    <View style={[
      styles.card,
      strong && styles.cardStrong,
      glow && styles.cardGlow,
      style,
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    ...theme.shadow.card,
    overflow: 'hidden',
  },
  cardStrong: {
    backgroundColor: theme.colors.glassStrong,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  cardGlow: {
    borderColor: theme.colors.accent1 + '50',
    shadowColor: theme.colors.accent1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
});

export default GlassCard;