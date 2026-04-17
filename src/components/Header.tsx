'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme, type Theme } from '@/context/ThemeContext';
import { useLanguage, type Lang } from '@/context/LanguageContext';
import styles from './Header.module.css';

const LANGS: { id: Lang; label: string }[] = [
  { id: 'pt', label: 'PT' },
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
  { id: 'es', label: 'ES' },
  { id: 'it', label: 'IT' },
];

const THEME_ACCENTS: Record<Theme, string> = {
  a: '#5b8db8',
  b: '#4a6fa5',
  c: '#8a8070',
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Arthur<span> Simões</span>
          </Link>

          <ul className={styles.links}>
            <li><Link href="#home" className={styles.link}>{t('nav.home')}</Link></li>
            <li><Link href="#about" className={styles.link}>{t('nav.about')}</Link></li>
            <li><Link href="#projects" className={styles.link}>{t('nav.projects')}</Link></li>
            <li><Link href="#contact" className={styles.link}>{t('nav.contact')}</Link></li>
          </ul>

          <div className={styles.controls}>
            <div className={styles.langToggle}>
              {LANGS.map((l) => (
                <button
                  key={l.id}
                  className={`${styles.langBtn} ${lang === l.id ? styles.langActive : ''}`}
                  onClick={() => setLang(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className={styles.themeToggleWrap}>
              <button
                className={styles.themeBtn}
                onClick={() => setThemeOpen((v) => !v)}
                aria-label="Alterar tema"
              >
                <span
                  className={styles.themeDot}
                  style={{ background: THEME_ACCENTS[theme] }}
                />
              </button>
              {themeOpen && (
                <div className={styles.themePopover}>
                  {(['a', 'b', 'c'] as Theme[]).map((th) => (
                    <button
                      key={th}
                      className={`${styles.themeSwatch} ${theme === th ? styles.themeSwatchActive : ''}`}
                      style={{ background: THEME_ACCENTS[th] }}
                      onClick={() => { setTheme(th); setThemeOpen(false); }}
                      aria-label={`Tema ${th}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
