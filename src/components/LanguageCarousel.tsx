'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Link from 'next/link';
import React, { useCallback, ReactNode } from 'react';
import { Project } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import WipCard from './WipCard';
import styles from './LanguageCarousel.module.css';

interface Props {
  label: string;
  icon: ReactNode;
  iconColor: string;
  projects: Project[];
}

export default function LanguageCarousel({ label, icon, iconColor, projects }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: 'start' },
    [WheelGesturesPlugin()]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const { t } = useLanguage();

  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span className={styles.icon} style={{ color: iconColor }}>{icon}</span>
        <h3 className={styles.label}>{label}</h3>
      </div>

      <div className={styles.carousel}>
        <button className={styles.btnPrev} onClick={scrollPrev} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className={styles.btnNext} onClick={scrollNext} aria-label="Próximo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.container}>
            {projects.map((project) =>
              project.wip ? (
                <div className={styles.slide} key={project.id}>
                  <WipCard title={project.title} />
                </div>
              ) : (
                <div className={styles.slide} key={project.id}>
                  <Link href={`/projects/${project.slug}`} className={styles.card}>
                    <div
                      className={styles.cardBanner}
                      style={{ '--banner-color': iconColor } as React.CSSProperties}
                    >
                      <span className={styles.bannerIcon} style={{ color: iconColor }}>
                        {icon}
                      </span>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      {project.status && (
                        <span className={styles.statusBadge}>
                          {project.status === 'Concluído'
                            ? t('projects.status_done')
                            : project.status === 'Em Desenvolvimento'
                            ? t('projects.status_wip')
                            : t('projects.status_planned')}
                        </span>
                      )}
                      <p className={styles.cardDesc}>{project.description}</p>
                      <div className={styles.tags}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
