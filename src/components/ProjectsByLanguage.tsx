'use client';

import { FaJava } from 'react-icons/fa';
import { SiPython, SiTypescript } from 'react-icons/si';
import { FiTool } from 'react-icons/fi';
import { projects } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import LanguageCarousel from './LanguageCarousel';
import styles from './ProjectsByLanguage.module.css';

const GROUPS = [
  { key: 'Java' as const,       label: 'Java',           icon: <FaJava />,       color: '#f89820' },
  { key: 'Python' as const,     label: 'Python',         icon: <SiPython />,     color: '#3776ab' },
  { key: 'TypeScript' as const, label: 'TypeScript',     icon: <SiTypescript />, color: '#3178c6' },
  { key: 'wip' as const,        label: 'Em Construção',  icon: <FiTool />,       color: 'var(--accent)' },
];

export default function ProjectsByLanguage() {
  const { t } = useLanguage();

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <h2 className={`gradient-text ${styles.title}`}>{t('projects.title')}</h2>

        {GROUPS.map(({ key, label, icon, color }) => {
          const filtered = projects.filter((p) => p.language === key);
          if (filtered.length === 0) return null;
          return (
            <LanguageCarousel
              key={key}
              label={label}
              icon={icon}
              iconColor={color}
              projects={filtered}
            />
          );
        })}
      </div>
    </section>
  );
}
