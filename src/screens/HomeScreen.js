import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - theme.spacing.md * 2 - theme.spacing.sm * 2) / 3;

const tools = [
  { id: 'sip', label: 'SIP\nCalculator', icon: '📈', color: '#00D4FF', screen: 'SIP' },
  { id: 'lumpsum', label: 'Lumpsum\nCalc', icon: '🏦', color: '#FFB800', screen: 'Lumpsum' },
  { id: 'sipswp', label: 'SIP+SWP\nCalc', icon: '🔄', color: '#7B61FF', screen: 'SIP' },
  { id: 'goal', label: 'Goal\nPlanner', icon: '🎯', color: '#FF6B6B', screen: 'SIP' },
  { id: 'analyze', label: 'Analyze\nSIP', icon: '🔍', color: '#00FFB2', screen: 'SIP' },
  { id: 'compare', label: 'Compare\nSIP', icon: '⚖️', color: '#FF8A65', screen: 'SIP' },
  { id: 'quick', label: 'Quick\nCalc', icon: '⚡', color: '#00D4FF', screen: 'SIP' },
  { id: 'returns', label: 'Returns\nCalc', icon: '💹', color: '#FFB800', screen: 'SIP' },
  { id: 'delay', label: 'Delay Cost', icon: '⏰', color: '#FF6B6B', screen: 'SIP' },
  { id: 'tenure', label: 'Tenure\nCalc', icon: '📅', color: '#7B61FF', screen: 'SIP' },
  { id: 'stp', label: 'STP\nCalc', icon: '💱', color: '#00FFB2', screen: 'SIP' },
  { id: 'swp', label: 'SWP\nCalc', icon: '💸', color: '#FF8A65', screen: 'SIP' },
  { id: 'fd', label: 'FD\nCalc', icon: '🏛️', color: '#00D4FF', screen: 'SIP' },
  { id: 'rd', label: 'RD\nCalc', icon: '💰', color: '#FFB800', screen: 'SIP' },
  { id: 'loan', label: 'Loan+SIP', icon: '🏠', color: '#7B61FF', screen: 'SIP' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Banner */}
      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text style={styles.heroLabel}>SMART INVESTING</Text>
        <Text style={styles.heroTitle}>SIP Planner</Text>
        <Text style={styles.heroSub}>
          Calculate, plan & optimize{'\n'}your mutual fund investments
        </Text>

        {/* Quick stat pills */}
        <View style={styles.statRow}>
          {['15+ Calculators', 'Advanced Mode', 'Inflation Adjusted'].map((s) => (
            <View key={s} style={styles.statPill}>
              <Text style={styles.statText}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Feature highlight CTA */}
      <TouchableOpacity
        style={styles.ctaCard}
        onPress={() => navigation.navigate('SIP')}
        activeOpacity={0.85}
      >
        <View>
          <Text style={styles.ctaLabel}>MOST USED</Text>
          <Text style={styles.ctaTitle}>SIP Calculator</Text>
          <Text style={styles.ctaSub}>With top-up, expense ratio & inflation</Text>
        </View>
        <Text style={styles.ctaArrow}>→</Text>
      </TouchableOpacity>

      {/* Tools Grid */}
      <Text style={styles.sectionTitle}>ALL TOOLS</Text>
      <View style={styles.grid}>
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[styles.toolCard, { borderColor: tool.color + '30' }]}
            onPress={() => navigation.navigate(tool.screen)}
            activeOpacity={0.75}
          >
            <View style={[styles.toolIcon, { backgroundColor: tool.color + '18' }]}>
              <Text style={styles.toolEmoji}>{tool.icon}</Text>
            </View>
            <Text style={[styles.toolLabel, { color: tool.color }]}>{tool.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: theme.spacing.md },

  hero: {
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadow.card,
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.colors.accent1 + '15',
  },
  heroLabel: {
    color: theme.colors.accent1,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
  },
  heroTitle: {
    color: theme.colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 6,
  },
  heroSub: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statPill: {
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
    borderRadius: theme.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statText: {
    color: theme.colors.accent1,
    fontSize: 11,
    fontWeight: '600',
  },

  ctaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.3)',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.accent1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaLabel: {
    color: theme.colors.accent1,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  ctaTitle: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  ctaSub: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  ctaArrow: {
    color: theme.colors.accent1,
    fontSize: 28,
    fontWeight: '200',
  },

  sectionTitle: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  toolCard: {
    width: CARD_SIZE,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm + 2,
    alignItems: 'center',
    ...theme.shadow.card,
  },
  toolIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  toolEmoji: {
    fontSize: 22,
  },
  toolLabel: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 14,
  },
});

export default HomeScreen;