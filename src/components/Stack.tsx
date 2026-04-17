'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './Stack.module.css';

const STACK = [
  { name: 'Java',             level: 90 },
  { name: 'Spring Boot',      level: 88 },
  { name: 'PostgreSQL',       level: 85 },
  { name: 'Docker',           level: 82 },
  { name: 'Spring Security',  level: 80 },
  { name: 'Redis',            level: 72 },
  { name: 'Cassandra',        level: 70 },
  { name: 'Next.js',          level: 65 },
];

export default function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack" className={styles.section}>
      <div className="container">
        <h2 className={`gradient-text ${styles.title}`}>{t('stack.title')}</h2>
        <div className={styles.grid}>
          {STACK.map((item) => (
            <div key={item.name} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.level}>{item.level}%</span>
              </div>
              <div className={styles.bar}>
                <div className={styles.fill} style={{ width: `${item.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
