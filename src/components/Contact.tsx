'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} gradient-text`}>{t('contact.title')}</h2>
        <p className={styles.cta}>{t('contact.cta')}</p>
        <p className={styles.description}>{t('contact.description')}</p>

        <div className={styles.links}>
          <a href="mailto:Amsbsimoes@gmail.com" className={styles.card}>
            <span className={styles.label}>{t('contact.email_label')}</span>
            <span className={styles.value}>Amsbsimoes@gmail.com</span>
          </a>
          <a href="https://github.com/ruhtraleugim" target="_blank" rel="noopener noreferrer" className={styles.card}>
            <span className={styles.label}>{t('contact.github_label')}</span>
            <span className={styles.value}>github.com/ruhtraleugim</span>
          </a>
          <a href="https://linkedin.com/in/arthursoutosimoes" target="_blank" rel="noopener noreferrer" className={styles.card}>
            <span className={styles.label}>{t('contact.linkedin_label')}</span>
            <span className={styles.value}>in/arthursoutosimoes</span>
          </a>
        </div>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Arthur Simões. {t('contact.footer')}</p>
        </footer>
      </div>
    </section>
  );
}