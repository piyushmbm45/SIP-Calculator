import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../styles/theme';
import { formatCurrency } from '../utils/calculations';

const ResultRow = ({ label, value, color, large = false, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [value, delay, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.row,
        large && styles.rowLarge,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={[styles.rowLabel, large && styles.rowLabelLarge]}>{label}</Text>
      <Text style={[styles.rowValue, large && styles.rowValueLarge, color && { color }]}>
        {value}
      </Text>
    </Animated.View>
  );
};

const DonutChart = ({ invested, gains }) => {
  const total = invested + gains;
  if (!total) return null;
  const gainPct = (gains / total) * 100;
  const investedPct = 100 - gainPct;

  return (
    <View style={styles.chartContainer}>
      {/* Simple visual bar chart representation */}
      <View style={styles.barChart}>
        <View style={[styles.barSegment, {
          flex: investedPct,
          backgroundColor: theme.colors.accent3,
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
        }]} />
        <View style={[styles.barSegment, {
          flex: gainPct,
          backgroundColor: theme.colors.positive,
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
        }]} />
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.accent3 }]} />
          <Text style={styles.legendLabel}>Invested {investedPct.toFixed(0)}%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.positive }]} />
          <Text style={styles.legendLabel}>Returns {gainPct.toFixed(0)}%</Text>
        </View>
      </View>
    </View>
  );
};

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <View style={styles.container}>
      {/* Main value */}
      <View style={styles.mainValueContainer}>
        <Text style={styles.mainLabel}>TOTAL VALUE</Text>
        <Text style={styles.mainValue}>{formatCurrency(result.futureValue)}</Text>
        <View style={styles.returnsBadge}>
          <Text style={styles.returnsText}>
            +{result.absoluteReturns.toFixed(1)}% returns
          </Text>
        </View>
      </View>

      {/* Donut / Bar Chart */}
      <DonutChart
        invested={result.totalInvested}
        gains={result.wealthGained}
      />

      {/* Breakdown */}
      <View style={styles.breakdown}>
        <ResultRow
          label="Amount Invested"
          value={formatCurrency(result.totalInvested)}
          color={theme.colors.accent3}
          delay={0}
        />
        <View style={styles.divider} />
        <ResultRow
          label="Wealth Gained"
          value={formatCurrency(result.wealthGained)}
          color={theme.colors.positive}
          delay={80}
        />
        {result.cagr > 0 && (
          <>
            <View style={styles.divider} />
            <ResultRow
              label="CAGR"
              value={`${result.cagr.toFixed(2)}%`}
              color={theme.colors.accent1}
              delay={160}
            />
          </>
        )}
        {result.inflationAdjusted && result.inflationAdjusted !== result.futureValue && (
          <>
            <View style={styles.divider} />
            <ResultRow
              label="Inflation Adjusted Value"
              value={formatCurrency(result.inflationAdjusted)}
              color={theme.colors.warning}
              delay={240}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.resultBg,
    borderWidth: 1,
    borderColor: theme.colors.resultBorder,
    overflow: 'hidden',
    marginTop: theme.spacing.lg,
  },
  mainValueContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,212,255,0.15)',
  },
  mainLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  mainValue: {
    color: theme.colors.accent1,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1,
    textShadowColor: theme.colors.accent1 + '60',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  returnsBadge: {
    marginTop: 10,
    backgroundColor: 'rgba(0,255,178,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,178,0.3)',
    borderRadius: theme.radius.full,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  returnsText: {
    color: theme.colors.positive,
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,212,255,0.15)',
  },
  barChart: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  barSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  breakdown: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLarge: {
    paddingVertical: 16,
  },
  rowLabel: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  rowLabelLarge: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  rowValue: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  rowValueLarge: {
    fontSize: 20,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});

export default ResultCard;