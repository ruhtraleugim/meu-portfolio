'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, ReactNode } from 'react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
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
                    <div className={styles.cardImage}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 30vw"
                      />
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

        <div className={styles.controls}>
          <button className={styles.btnControl} onClick={scrollPrev} aria-label="Anterior">←</button>
          <button className={styles.btnControl} onClick={scrollNext} aria-label="Próximo">→</button>
        </div>
      </div>
    </div>
  );
}
