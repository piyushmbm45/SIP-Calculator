import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../styles/theme';
import GlassInput from '../components/GlassInput';
import ResultCard from '../components/ResultCard';
import { calculateLumpsum } from '../utils/calculations';

const LumpsumScreen = () => {
  const [principal, setPrincipal] = useState('');
  const [returns, setReturns] = useState('');
  const [years, setYears] = useState('');
  const [expenseRatio, setExpenseRatio] = useState('');
  const [result, setResult] = useState(null);
  const scrollRef = useRef(null);

  const handleCalculate = () => {
    const res = calculateLumpsum({ principal, annualReturn: returns, years, expenseRatio });
    setResult(res);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const handleReset = () => {
    setPrincipal('');
    setReturns('');
    setYears('');
    setExpenseRatio('');
    setResult(null);
  };

  const isValid = principal && returns && years;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Lumpsum</Text>
          <Text style={styles.headerSub}>One-time Investment Calculator</Text>
        </View>

        <View style={styles.card}>
          <GlassInput
            label="Investment Amount"
            value={principal}
            onChangeText={setPrincipal}
            placeholder="1,00,000"
            prefix="₹"
          />
          <View style={styles.row2}>
            <GlassInput
              label="Expected Returns"
              value={returns}
              onChangeText={setReturns}
              placeholder="12"
              suffix="%"
              style={{ flex: 1, marginRight: 10 }}
            />
            <GlassInput
              label="Expense Ratio"
              value={expenseRatio}
              onChangeText={setExpenseRatio}
              placeholder="0"
              suffix="%"
              style={{ flex: 1 }}
            />
          </View>
          <GlassInput
            label="Investment Period"
            value={years}
            onChangeText={setYears}
            placeholder="10"
            suffix="Years"
          />
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.calcBtn, !isValid && styles.calcBtnDisabled]}
            onPress={handleCalculate}
            disabled={!isValid}
            activeOpacity={0.85}
          >
            <Text style={styles.calcBtnText}>CALCULATE</Text>
          </TouchableOpacity>
          {result && (
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>RESET</Text>
            </TouchableOpacity>
          )}
        </View>

        {result && <ResultCard result={result} />}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: theme.spacing.md, paddingTop: theme.spacing.sm },
  header: { paddingVertical: theme.spacing.lg, paddingHorizontal: 4 },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSub: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
  },
  row2: { flexDirection: 'row' },
  btnRow: { flexDirection: 'row', gap: 10, marginBottom: theme.spacing.sm },
  calcBtn: {
    flex: 1,
    height: 56,
    backgroundColor: theme.colors.accent2,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.accent2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  calcBtnDisabled: { opacity: 0.4 },
  calcBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  resetBtn: {
    width: 70,
    height: 56,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default LumpsumScreen;