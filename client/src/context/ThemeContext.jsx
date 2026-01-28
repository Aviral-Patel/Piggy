import React, { createContext, useContext, useState, useLayoutEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'piggy-theme';

function applyTheme(isDark) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
  }
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored !== null) return stored === 'dark';
    return false;
  });

  // Sync theme to DOM before paint so Tailwind dark: classes apply immediately
  useLayoutEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
