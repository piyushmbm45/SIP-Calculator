export const theme = {
    colors: {
      // Deep space gradient background
      bg1: '#0A0E1A',
      bg2: '#0D1B3E',
      bg3: '#0A1628',
  
      // Glass surfaces
      glass: 'rgba(255, 255, 255, 0.06)',
      glassBorder: 'rgba(255, 255, 255, 0.12)',
      glassStrong: 'rgba(255, 255, 255, 0.10)',
  
      // Accent - electric cyan-gold duotone
      accent1: '#00D4FF',
      accent2: '#FFB800',
      accent3: '#7B61FF',
  
      // Text
      textPrimary: '#FFFFFF',
      textSecondary: 'rgba(255,255,255,0.55)',
      textMuted: 'rgba(255,255,255,0.30)',
  
      // Input
      inputBg: 'rgba(255,255,255,0.08)',
      inputBorder: 'rgba(0, 212, 255, 0.3)',
      inputFocus: 'rgba(0, 212, 255, 0.6)',
  
      // Result card
      resultBg: 'rgba(0, 212, 255, 0.08)',
      resultBorder: 'rgba(0, 212, 255, 0.25)',
  
      // Success / positive
      positive: '#00FFB2',
      warning: '#FFB800',
  
      // Tab bar
      tabActive: '#00D4FF',
      tabInactive: 'rgba(255,255,255,0.35)',
    },
  
    fonts: {
      display: 'System',      // Will be overridden in usage
      body: 'System',
    },
  
    radius: {
      sm: 8,
      md: 14,
      lg: 20,
      xl: 28,
      full: 999,
    },
  
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
  
    shadow: {
      glow: {
        shadowColor: '#00D4FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 10,
      },
      card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 12,
      },
    },
  };