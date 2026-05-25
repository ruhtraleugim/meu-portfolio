'use client';

import { FiTool } from 'react-icons/fi';
import styles from './WipCard.module.css';

interface Props {
  title: string;
}

export default function WipCard({ title }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <FiTool className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>algo grande chegando...</p>
    </div>
  );
}
