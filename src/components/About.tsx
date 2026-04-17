'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './About.module.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.bio}>
            <h2 className="gradient-text">{t('about.title')}</h2>
            <p className={styles.text}>{t('about.p1')}</p>
            <p className={styles.text}>{t('about.p2')}</p>
            <p className={styles.text}>{t('about.p3')}</p>
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('about.card_backend')}</h3>
              <p className={styles.cardDesc}>{t('about.card_backend_desc')}</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('about.card_devops')}</h3>
              <p className={styles.cardDesc}>{t('about.card_devops_desc')}</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('about.card_frontend')}</h3>
              <p className={styles.cardDesc}>{t('about.card_frontend_desc')}</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{t('about.card_engineering')}</h3>
              <p className={styles.cardDesc}>{t('about.card_engineering_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}