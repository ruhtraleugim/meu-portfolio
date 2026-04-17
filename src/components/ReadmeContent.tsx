'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { useLanguage, type Lang } from '@/context/LanguageContext';
import styles from './ReadmeContent.module.css';

interface ReadmeContentProps {
  readmes: Partial<Record<Lang, string>>;
  fallbackHtml?: string;
}

export default function ReadmeContent({ readmes, fallbackHtml }: ReadmeContentProps) {
  const { lang } = useLanguage();

  const content = readmes[lang] ?? readmes['pt'];

  if (!content) {
    if (fallbackHtml) {
      return <div className={styles.content} dangerouslySetInnerHTML={{ __html: fallbackHtml }} />;
    }
    return null;
  }

  return (
    <div className={styles.content}>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
    </div>
  );
}
