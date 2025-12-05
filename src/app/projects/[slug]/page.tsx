import { projects } from '@/data/projects';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className={styles.main}>
            {/* Hero Banner */}
            <div className={styles.banner}>
                <div className={styles.bannerImage} style={{ backgroundImage: `url(${project.image})` }} />
                <div className={styles.bannerOverlay} />
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <Link href="/#projects" className={styles.backLink}>
                        ← Voltar para Projetos
                    </Link>
                    <div className={styles.headerContent}>
                        {project.status && (
                            <span className={styles.statusBadge}>{project.status}</span>
                        )}
                        <h1 className={styles.title}>{project.title}</h1>
                        <p className={styles.description}>{project.description}</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={styles.content}>
                    <div className={styles.body}>
                        <div dangerouslySetInnerHTML={{ __html: project.content }} />
                    </div>

                    <aside className={styles.sidebar}>
                        <div className={styles.stickyWrapper}>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Tecnologias</h3>
                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.divider} />

                                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Links</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textAlign: 'center' }}>
                                            Ver no GitHub
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary} style={{ textAlign: 'center' }}>
                                            Ver Online
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
