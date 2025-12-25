import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Hello World
        </Text>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Hello World
        </Text>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Hello World
        </Text>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Hello World
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  darkText: {
    color: 'white',
  },
});

export default App;
