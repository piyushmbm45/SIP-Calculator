import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import { theme } from '../styles/theme';

const GlassInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
  suffix,
  keyboardType = 'numeric',
  style,
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Tapping anywhere on the wrapper row focuses the hidden TextInput
  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableWithoutFeedback onPress={handleWrapperPress}>
        <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
          {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}

          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || '0'}
            placeholderTextColor={theme.colors.textMuted}
            keyboardType={keyboardType}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            selectionColor={theme.colors.accent1}
            // Android: prevent underline and keep consistent height
            underlineColorAndroid="transparent"
            // iOS: clear button off to keep clean glass look
            clearButtonMode="never"
          />

          {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    // Explicit height on both platforms prevents collapsed touch target
    height: 52,
  },
  inputFocused: {
    borderColor: theme.colors.inputFocus,
    backgroundColor: 'rgba(0, 212, 255, 0.06)',
    shadowColor: theme.colors.accent1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  prefix: {
    color: theme.colors.accent1,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
    // Prevent prefix Text from swallowing touches
    pointerEvents: 'none',
  },
  input: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: 17,
    fontWeight: '500',
    // Android needs explicit height inside flex row or it collapses
    height: 52,
    // Remove default Android padding that shifts text
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  suffix: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    pointerEvents: 'none',
  },
});

export default GlassInput;