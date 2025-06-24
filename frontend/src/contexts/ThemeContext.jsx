import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getSystemTheme } from '../utils/SystemThemeFinder';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useLocalStorage('theme', 'system');
  const [currentTheme, setCurrentTheme] = useState('light'); // Default theme

  useEffect(() => {
    const updateTheme = () => {
      if (themePreference === 'system') {
        const systemTheme = getSystemTheme();
        setCurrentTheme(systemTheme);
        applyThemeToDOM(systemTheme);
      } else {
        setCurrentTheme(themePreference);
        applyThemeToDOM(themePreference);
      }
    };

    // Set theme on initial load
    updateTheme();

    // Add event listener for system theme changes
    if (themePreference === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
    }

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme);
    };
  }, [themePreference]);

  const applyThemeToDOM = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setTheme = (theme) => {
    setThemePreference(theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setThemePreference(newTheme);
  };

  const value = {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    themePreference
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};