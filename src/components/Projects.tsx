'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { projects } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Projects.module.css';

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const { t } = useLanguage();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <h2 className={`gradient-text ${styles.title}`}>{t('projects.title')}</h2>

        <div className={styles.carousel}>
          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.container}>
              {projects.map((project) => (
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
                          {project.status === 'Concluído' ? t('projects.status_done') :
                           project.status === 'Em Desenvolvimento' ? t('projects.status_wip') :
                           t('projects.status_planned')}
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
              ))}
            </div>
          </div>

          <div className={styles.controls}>
            <button className={styles.btnControl} onClick={scrollPrev} aria-label="Anterior">←</button>
            <button className={styles.btnControl} onClick={scrollNext} aria-label="Próximo">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
