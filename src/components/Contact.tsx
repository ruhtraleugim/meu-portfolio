import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <h2 className={`${styles.title} gradient-text`}>Vamos Conversar?</h2>

                <p className={styles.description}>
                    Aberto para projetos e oportunidades em Back-end, DevOps,
                    <br /> DevSecOps e aplicações full-stack com Next.js.
                    <br />
                    <strong>Fala comigo</strong> — que eu respondo rápido e sem enrolação.
                </p>

                <div className={styles.links}>
                    <a href="mailto:Amsbsimoes@gmail.com" className={styles.card}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>Amsbsimoes@gmail.com</span>
                    </a>

                    <a href="https://github.com/ruhtraleugim" target="_blank" rel="noopener noreferrer" className={styles.card}>
                        <span className={styles.label}>GitHub</span>
                        <span className={styles.value}>github.com/ruhtraleugim</span>
                    </a>

                    <a href="https://linkedin.com/in/arthursoutosimoes" target="_blank" rel="noopener noreferrer" className={styles.card}>
                        <span className={styles.label}>LinkedIn</span>
                        <span className={styles.value}>in/arthursoutosimoes</span>
                    </a>
                </div>

                <footer className={styles.footer}>
                    <p>© {new Date().getFullYear()} Arthur Simões. Todos os direitos reservados.</p>
                </footer>
            </div>
        </section>
    );
}