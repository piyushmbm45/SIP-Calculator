import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import { theme } from './src/styles/theme';
import Background from './src/components/Background';
import AppHeader from './src/components/AppHeader';
import TabBar from './src/components/TabBar';

import HomeScreen from './src/screens/HomeScreen';
import SIPCalculatorScreen from './src/screens/SIPCalculatorScreen';
import LumpsumScreen from './src/screens/LumpsumScreen';

const Tab = createBottomTabNavigator();

/**
 * Wrapper to inject background + header for each screen
 */
const ScreenWrapper = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => (
  <Background>
    <AppHeader title={title} subtitle={subtitle} showBack={false} onBack={() => {}} />
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </Background>
);

const HomeWrapper = (props: any) => (
  <ScreenWrapper title="SIP Planner" subtitle="SMART INVEST TOOLS">
    <HomeScreen {...props} />
  </ScreenWrapper>
);

const SIPWrapper = (props: any) => (
  <ScreenWrapper title="SIP Calculator" subtitle="SYSTEMATIC INVESTMENT PLAN">
    <SIPCalculatorScreen {...props} />
  </ScreenWrapper>
);

const LumpsumWrapper = (props: any) => (
  <ScreenWrapper title="Lumpsum" subtitle="ONE-TIME INVESTMENT">
    <LumpsumScreen {...props} />
  </ScreenWrapper>
);

const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.colors.bg1,
          card: theme.colors.bg1,
          text: theme.colors.textPrimary,
          border: theme.colors.glassBorder,
          primary: theme.colors.accent1,
          notification: theme.colors.accent1,
        },
        dark: true,
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '800',
          },
        },
      }}
    >
      <Tab.Navigator
        tabBar={(props: any) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeWrapper} />
        <Tab.Screen name="SIP" component={SIPWrapper} />
        <Tab.Screen name="Lumpsum" component={LumpsumWrapper} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;