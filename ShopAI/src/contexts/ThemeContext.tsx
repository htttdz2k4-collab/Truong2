import React, { createContext, useContext, useState, useMemo } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textLight: string;
  border: string;
  error: string;
  success: string;
}

export const lightColors: ThemeColors = {
  primary: '#FF4D4F',
  secondary: '#FA8C16',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  textLight: '#95A5A6',
  border: '#E8E8E8',
  error: '#FF4D4F',
  success: '#52C41A',
};

export const darkColors: ThemeColors = {
  primary: '#FF4D4F',
  secondary: '#FA8C16',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textLight: '#888888',
  border: '#333333',
  error: '#FF4D4F',
  success: '#52C41A',
};

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const colors = useMemo(() => (isDark ? darkColors : lightColors), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
