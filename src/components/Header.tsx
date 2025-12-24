"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        Arthur<span> Simões</span>
                    </Link>

                    <ul className={styles.links}>
                        <li><Link href="#home" className={styles.link}>Início</Link></li>
                        <li><Link href="#about" className={styles.link}>Sobre</Link></li>
                        <li><Link href="#projects" className={styles.link}>Projetos</Link></li>
                        <li><Link href="#contact" className={styles.link}>Contato</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}