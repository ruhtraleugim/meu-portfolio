'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'pt' | 'en' | 'de' | 'es' | 'it';
const STORAGE_KEY = 'portfolio-lang';
const DEFAULT_LANG: Lang = 'pt';

type Translations = Record<string, unknown>;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (k) => k,
});

function getNestedValue(obj: Translations, key: string): string {
  const result = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as object)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
  return (result as string | undefined) ?? key;
}

const cache: Partial<Record<Lang, Translations>> = {};

const LOCALE_LOADERS: Record<Lang, () => Promise<{ default: Translations }>> = {
  pt: () => import('@/locales/pt.json'),
  en: () => import('@/locales/en.json'),
  de: () => import('@/locales/de.json'),
  es: () => import('@/locales/es.json'),
  it: () => import('@/locales/it.json'),
};

async function loadTranslations(lang: Lang): Promise<Translations> {
  if (cache[lang]) return cache[lang]!;
  const mod = await LOCALE_LOADERS[lang]();
  cache[lang] = mod.default;
  return mod.default;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    const initial = saved && ['pt', 'en', 'de', 'es', 'it'].includes(saved) ? saved : DEFAULT_LANG;
    setLangState(initial);
    loadTranslations(initial).then(setTranslations);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    loadTranslations(l).then(setTranslations);
  }

  function t(key: string): string {
    return getNestedValue(translations, key);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
