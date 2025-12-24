import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.background}>
                <div className={`${styles.blob} ${styles.blob1}`} />
                <div className={`${styles.blob} ${styles.blob2}`} />
            </div>

            <div className="container">
                <div className={styles.content}>
                    <span className={styles.greeting}>Olá, eu sou Arthur Simões</span>
                    <h1 className={styles.title}>
                        Engenharia de Software <br />
                        <span className="gradient-text">Sólida e Escalável</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Focado em Back-end e DevSecOps. Construindo sistemas à prova de falhas,
                        do código à infraestrutura.
                    </p>

                    <div className={styles.actions}>
                        <Link href="#about" className="btn-primary">
                            Sobre Mim
                        </Link>
                        <Link href="#contact" className={styles.btnSecondary}>
                            Entrar em Contato
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}