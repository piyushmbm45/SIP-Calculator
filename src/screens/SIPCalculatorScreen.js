import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  Platform,
} from 'react-native';
import { theme } from '../styles/theme';
import GlassInput from '../components/GlassInput';
import ResultCard from '../components/ResultCard';
import GrowthTable from '../components/GrowthTable';
import { calculateSIP } from '../utils/calculations';

const SIPCalculatorScreen = () => {
  const [monthly, setMonthly] = useState('');
  const [returns, setReturns] = useState('');
  const [years, setYears] = useState('');
  const [expenseRatio, setExpenseRatio] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [topUpPercent, setTopUpPercent] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [compoundFreq, setCompoundFreq] = useState('monthly');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const scrollRef = useRef(null);
  const advancedAnim = useRef(new Animated.Value(0)).current;

  const toggleAdvanced = () => {
    const next = !showAdvanced;
    setShowAdvanced(next);
    Animated.spring(advancedAnim, {
      toValue: next ? 1 : 0,
      tension: 50,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };

  const handleCalculate = () => {
    if (!monthly || parseFloat(monthly) <= 0) {
      setError('Enter a valid Monthly Investment amount.');
      return;
    }
    if (!returns || parseFloat(returns) <= 0) {
      setError('Enter a valid Expected Returns (%) value.');
      return;
    }
    if (!years || parseFloat(years) <= 0) {
      setError('Enter a valid Investment Period (years).');
      return;
    }

    setError('');

    const res = calculateSIP({
      monthlyInvestment: monthly,
      annualReturn: returns,
      years,
      expenseRatio,
      initialInvestment,
      topUpPercent,
      inflationRate,
      compoundFrequency: compoundFreq,
    });

    if (!res) {
      setError('Calculation failed. Please check your input values.');
      return;
    }

    setResult(res);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleReset = () => {
    setMonthly('');
    setReturns('');
    setYears('');
    setExpenseRatio('');
    setInitialInvestment('');
    setTopUpPercent('');
    setInflationRate('');
    setResult(null);
    setError('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SIP Calculator</Text>
          <Text style={styles.headerSub}>Systematic Investment Plan</Text>
        </View>

        <View style={styles.card}>
          <GlassInput
            label="Monthly Investment"
            value={monthly}
            onChangeText={(v) => { setMonthly(v); setError(''); }}
            placeholder="5000"
            prefix="₹"
          />
          <View style={styles.row2}>
            <GlassInput
              label="Expected Returns"
              value={returns}
              onChangeText={(v) => { setReturns(v); setError(''); }}
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
          <View style={styles.row2}>
            <GlassInput
              label="Investment Period"
              value={years}
              onChangeText={(v) => { setYears(v); setError(''); }}
              placeholder="10"
              suffix="Yr"
              style={{ flex: 1, marginRight: 10 }}
            />
            <View style={{ flex: 1 }} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.advancedToggle}
          onPress={toggleAdvanced}
          activeOpacity={0.7}
        >
          <View style={styles.advancedLeft}>
            <View style={styles.advancedDot} />
            <Text style={styles.advancedLabel}>Advanced Settings</Text>
          </View>
          <Switch
            value={showAdvanced}
            onValueChange={toggleAdvanced}
            trackColor={{ false: 'rgba(255,255,255,0.15)', true: theme.colors.accent1 + '80' }}
            thumbColor={showAdvanced ? theme.colors.accent1 : 'rgba(255,255,255,0.5)'}
            ios_backgroundColor="rgba(255,255,255,0.15)"
          />
        </TouchableOpacity>

        {showAdvanced && (
          <View style={styles.card}>
            <GlassInput
              label="Initial Investment (Lumpsum)"
              value={initialInvestment}
              onChangeText={setInitialInvestment}
              placeholder="0"
              prefix="₹"
            />
            <View style={styles.row2}>
              <GlassInput
                label="Annual Top-Up"
                value={topUpPercent}
                onChangeText={setTopUpPercent}
                placeholder="0"
                suffix="%"
                style={{ flex: 1, marginRight: 10 }}
              />
              <GlassInput
                label="Inflation Rate"
                value={inflationRate}
                onChangeText={setInflationRate}
                placeholder="6"
                suffix="%"
                style={{ flex: 1 }}
              />
            </View>

            <Text style={styles.freqLabel}>COMPOUND FREQUENCY</Text>
            <View style={styles.freqRow}>
              {['monthly', 'quarterly', 'yearly'].map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.freqBtn, compoundFreq === f && styles.freqBtnActive]}
                  onPress={() => setCompoundFreq(f)}
                >
                  <Text style={[styles.freqText, compoundFreq === f && styles.freqTextActive]}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {error !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.calcBtn}
            onPress={handleCalculate}
            activeOpacity={0.8}
          >
            <Text style={styles.calcBtnText}>CALCULATE</Text>
          </TouchableOpacity>

          {result !== null && (
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={handleReset}
              activeOpacity={0.7}
            >
              <Text style={styles.resetText}>RESET</Text>
            </TouchableOpacity>
          )}
        </View>

        {result !== null && (
          <>
            <ResultCard result={result} />
            <GrowthTable breakdown={result.monthlyBreakdown} />
          </>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  header: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: 4,
  },
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
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  advancedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  advancedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent1,
  },
  advancedLabel: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  freqLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 4,
  },
  freqRow: {
    flexDirection: 'row',
    gap: 8,
  },
  freqBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  freqBtnActive: {
    backgroundColor: 'rgba(0,212,255,0.15)',
    borderColor: theme.colors.accent1,
  },
  freqText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  freqTextActive: { color: theme.colors.accent1 },
  errorBox: {
    backgroundColor: 'rgba(255,80,80,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,80,80,0.35)',
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '600',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: theme.spacing.sm,
  },
  calcBtn: {
    flex: 1,
    height: 56,
    backgroundColor: theme.colors.accent1,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.accent1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
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

export default SIPCalculatorScreen;