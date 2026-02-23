import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    Home: '⊞',
    SIP: '📈',
    Lumpsum: '🏦',
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tab, isFocused && styles.tabActive]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
            >
              <Text style={styles.tabIcon}>{icons[route.name] || '•'}</Text>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {route.name}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: 8,
    backgroundColor: theme.colors.bg1,
    borderTopWidth: 1,
    borderTopColor: theme.colors.glassBorder,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.xl,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: theme.radius.lg,
    position: 'relative',
  },
  tabActive: {
    backgroundColor: 'rgba(0,212,255,0.12)',
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  tabLabel: {
    color: theme.colors.tabInactive,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: theme.colors.accent1,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.accent1,
  },
});

export default TabBar;