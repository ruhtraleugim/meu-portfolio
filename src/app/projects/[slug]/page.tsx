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
            <div className="container">
                <Link href="/#projects" className={styles.backLink}>
                    ← Voltar para Projetos
                </Link>

                <header className={styles.header}>
                    <h1 className={styles.title}>{project.title}</h1>
                    <div className={styles.tags}>
                        {project.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className={styles.content}>
                    <div
                        className={styles.body}
                        dangerouslySetInnerHTML={{ __html: project.content }}
                    />

                    <aside className={styles.sidebar}>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Links do Projeto</h3>
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
                    </aside>
                </div>
            </div>
        </main>
    );
}
