import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { theme } from '../styles/theme';

const AppHeader = ({ title, subtitle, showBack, onBack }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.bg1} />
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>₹</Text>
          </View>
          <View>
            <Text style={styles.title}>{title || 'SIP Planner'}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>⚙</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 12,
    backgroundColor: theme.colors.bg1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.glassBorder,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  backIcon: {
    color: theme.colors.textPrimary,
    fontSize: 18,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(0,212,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.colors.accent1,
    fontSize: 18,
    fontWeight: '800',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    letterSpacing: 0.5,
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
});

export default AppHeader;