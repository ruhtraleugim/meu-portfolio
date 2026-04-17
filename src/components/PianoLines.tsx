'use client';

import styles from './PianoLines.module.css';

interface LineConfig {
  width: '1px' | '2px' | '3px';
  height: string;
  left: string;
  duration: number;
  delay: number;
  opacity: number;
}

const LINES: LineConfig[] = [
  // Finas — rápidas
  { width: '1px', height: '32vh', left: '7%',  duration: 2.6, delay: 0.0, opacity: 0.22 },
  { width: '1px', height: '28vh', left: '19%', duration: 3.3, delay: 1.1, opacity: 0.18 },
  { width: '1px', height: '36vh', left: '33%', duration: 2.4, delay: 0.6, opacity: 0.20 },
  { width: '1px', height: '30vh', left: '52%', duration: 3.0, delay: 1.9, opacity: 0.17 },
  { width: '1px', height: '34vh', left: '71%', duration: 2.8, delay: 0.3, opacity: 0.20 },
  { width: '1px', height: '26vh', left: '88%', duration: 3.5, delay: 1.5, opacity: 0.16 },
  // Médias — lentas
  { width: '2px', height: '52vh', left: '13%', duration: 4.8, delay: 0.4, opacity: 0.13 },
  { width: '2px', height: '58vh', left: '42%', duration: 5.5, delay: 2.3, opacity: 0.11 },
  { width: '2px', height: '48vh', left: '76%', duration: 4.3, delay: 1.0, opacity: 0.12 },
  // Grossas — dramáticas
  { width: '3px', height: '78vh', left: '28%', duration: 7.2, delay: 0.0, opacity: 0.07 },
  { width: '3px', height: '70vh', left: '62%', duration: 8.8, delay: 4.0, opacity: 0.06 },
];

export default function PianoLines() {
  return (
    <div className={styles.canvas} aria-hidden="true">
      {LINES.map((line, i) => (
        <div
          key={i}
          className={styles.line}
          style={{
            width: line.width,
            height: line.height,
            left: line.left,
            animationDuration: `${line.duration}s`,
            animationDelay: `${line.delay}s`,
            '--op': line.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
