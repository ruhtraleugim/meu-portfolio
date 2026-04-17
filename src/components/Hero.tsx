'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.greeting}>{t('hero.greeting')} Arthur Simões</span>
          <h1 className={styles.title}>{t('hero.headline')}</h1>
          <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          <div className={styles.actions}>
            <Link href="#projects" className="btn-primary">
              {t('hero.cta_primary')}
            </Link>
            <Link href="#contact" className={styles.btnSecondary}>
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}