import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@contexts/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  return (
    // SafeAreaProvider bọc ngoài cùng để tính toán phần "Tai thỏ" (Notch) trên iPhone
    <SafeAreaProvider>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
