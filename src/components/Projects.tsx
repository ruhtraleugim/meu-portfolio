"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useCallback } from 'react';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

export default function Projects() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 4000, stopOnInteraction: false })
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id="projects" style={{ padding: '100px 0', position: 'relative' }}>
            <div className="container">
                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                    Projetos em Destaque
                </h2>

                <div className={styles.carousel}>
                    <div className={styles.viewport} ref={emblaRef}>
                        <div className={styles.container}>
                            {projects.map((project) => (
                                <div className={styles.slide} key={project.id}>
                                    <Link href={`/projects/${project.slug}`} className={styles.card}>
                                        <div className={styles.cardImage} />
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardTitle}>{project.title}</h3>
                                            {project.status && (
                                                <span className={styles.statusBadge}>{project.status}</span>
                                            )}
                                            <p className={styles.cardDesc}>{project.description}</p>
                                            <div className={styles.tags}>
                                                {project.tags.map(tag => (
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
                        <button className={styles.btnControl} onClick={scrollPrev} aria-label="Anterior">
                            ←
                        </button>
                        <button className={styles.btnControl} onClick={scrollNext} aria-label="Próximo">
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
