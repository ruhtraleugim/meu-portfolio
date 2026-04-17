'use client';

import { useState } from 'react';
import { useTheme, type Theme } from '@/context/ThemeContext';
import PianoLines from './PianoLines';
import styles from './EntryScreen.module.css';

const THEMES: { id: Theme; number: string; name: string; desc: string; swatches: string[] }[] = [
  {
    id: 'a',
    number: '01',
    name: 'Marinho + Gelo',
    desc: 'Azul noturno profundo com gelo. Elegante, técnico.',
    swatches: ['#12151e', '#1e2535', '#5b8db8', '#a8c4d8'],
  },
  {
    id: 'b',
    number: '02',
    name: 'Cimento + Aço',
    desc: 'Cinza neutro com azul aço. Frio, preciso.',
    swatches: ['#1a1a1e', '#2c2c32', '#4a6fa5', '#c8d0d8'],
  },
  {
    id: 'c',
    number: '03',
    name: 'Concreto + Madeira',
    desc: 'Escuro quente com areia e bege. Orgânico.',
    swatches: ['#17171a', '#28271f', '#8a8070', '#c0bab2'],
  },
];

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState<Theme>(theme);
  const [leaving, setLeaving] = useState(false);

  function pick(t: Theme) {
    setSelected(t);
    setTheme(t);
  }

  function enter() {
    setLeaving(true);
    setTimeout(onEnter, 600);
  }

  return (
    <div className={`${styles.screen} ${leaving ? styles.leaving : ''}`} data-theme={selected}>
      <PianoLines />

      <div className={styles.content}>
        <div className={styles.intro}>
          <div className={styles.label}>Arthur Simões — Portfólio</div>
          <h1 className={styles.title}>Para entrar, escolha seu tema</h1>
          <p className={styles.sub}>Você pode alterar a qualquer momento</p>
        </div>

        <div className={styles.cards}>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`${styles.card} ${selected === t.id ? styles.selected : ''}`}
              onClick={() => pick(t.id)}
              data-theme-preview={t.id}
            >
              <span className={styles.cardNumber}>{t.number}</span>
              {selected === t.id && <span className={styles.check}>✓</span>}

              <div className={styles.preview}>
                <div className={styles.previewHero}>
                  <span className={styles.previewName}>Arthur Simões</span>
                  <div className={styles.previewDivider} />
                  <span className={styles.previewRole}>Backend · DevSecOps</span>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.infoRow}>
                  <span className={styles.optName}>{t.name}</span>
                  <div className={styles.swatches}>
                    {t.swatches.map((c) => (
                      <div key={c} className={styles.swatch} style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <p className={styles.optDesc}>{t.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.cta}>
          <button className={styles.enterBtn} onClick={enter}>
            Entrar
          </button>
          <span className={styles.ctaHint}>Tema salvo automaticamente</span>
        </div>
      </div>
    </div>
  );
}
