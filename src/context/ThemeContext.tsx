'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'a' | 'b' | 'c';
const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME: Theme = 'a';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  isReady: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && ['a', 'b', 'c'].includes(saved)) {
      setThemeState(saved);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, isReady]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isReady }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function hasThemeSaved(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(STORAGE_KEY);
}
