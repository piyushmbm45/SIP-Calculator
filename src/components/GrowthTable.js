import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { formatCurrency } from '../utils/calculations';

const GrowthTable = ({ breakdown }) => {
  const [expanded, setExpanded] = useState(false);

  if (!breakdown || breakdown.length === 0) return null;

  const displayData = expanded ? breakdown : breakdown.slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YEAR-BY-YEAR GROWTH</Text>

      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell, { flex: 0.7 }]}>Year</Text>
        <Text style={[styles.cell, styles.headerCell, { flex: 1.3 }]}>Invested</Text>
        <Text style={[styles.cell, styles.headerCell, { flex: 1.3 }]}>Value</Text>
        <Text style={[styles.cell, styles.headerCell, { flex: 1.3 }]}>Gains</Text>
      </View>

      {displayData.map((row, idx) => (
        <View key={row.year} style={[styles.row, idx % 2 === 0 && styles.rowAlt]}>
          <Text style={[styles.cell, { flex: 0.7, color: theme.colors.accent1 }]}>
            {row.year}
          </Text>
          <Text style={[styles.cell, { flex: 1.3 }]}>
            {formatCurrency(row.invested)}
          </Text>
          <Text style={[styles.cell, { flex: 1.3, color: theme.colors.textPrimary }]}>
            {formatCurrency(row.value)}
          </Text>
          <Text style={[styles.cell, { flex: 1.3, color: theme.colors.positive }]}>
            {formatCurrency(row.gains)}
          </Text>
        </View>
      ))}

      {breakdown.length > 5 && (
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandText}>
            {expanded ? 'Show Less ▲' : `Show All ${breakdown.length} Years ▼`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  title: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.glassBorder,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,212,255,0.06)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,212,255,0.1)',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  rowAlt: {
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  cell: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
  },
  headerCell: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  expandButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.glassBorder,
  },
  expandText: {
    color: theme.colors.accent1,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default GrowthTable;