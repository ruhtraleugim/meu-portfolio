import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.bio}>
                        <h2 className="gradient-text">Sobre Mim</h2>
                        <p className={styles.text}>
                            Sou <span className={styles.highlight}>Arthur Simões</span> — dev focado em Back-end, DevOps e em transição firme para DevSecOps.
                            Entrego aplicações rápidas, seguras e escaláveis. Trabalho principalmente com <span className={styles.highlight}>Java + Spring, PostgreSQL</span> e
                            estou avançando para arquiteturas distribuídas com Cassandra.
                        </p>
                        <p className={styles.text}>
                            No front, uso <span className={styles.highlight}>Next.js</span> para criar interfaces eficientes e integradas às minhas APIs.
                            Meu estilo é engenharia prática: automação, pipelines bem feitos, observabilidade e segurança aplicada desde o primeiro commit.
                        </p>
                        <p className={styles.text}>
                            Estou estruturando minha própria software house e trago mentalidade de performance, simplicidade e entrega contínua.
                            Meu foco é construir sistemas sólidos, limpos e à prova de falhas — do código à infraestrutura.
                        </p>
                    </div>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Back-end</h3>
                            <p className={styles.cardDesc}>Java, Spring Boot, PostgreSQL, Cassandra, Arquitetura Distribuída</p>
                        </div>

                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>DevOps & SecOps</h3>
                            <p className={styles.cardDesc}>CI/CD, Pipelines, Observabilidade, Segurança, Docker</p>
                        </div>

                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Frontend</h3>
                            <p className={styles.cardDesc}>Next.js, React, Interfaces Eficientes e Integradas</p>
                        </div>

                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Engenharia</h3>
                            <p className={styles.cardDesc}>Performance, Simplicity, Entrega Contínua, Sistemas Sólidos</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}