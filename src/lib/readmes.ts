import fs from 'fs';
import path from 'path';
import type { Lang } from '@/context/LanguageContext';

const READMES_DIR = path.join(process.cwd(), 'src/data/readmes');

export function getAllReadmes(slug: string): Partial<Record<Lang, string>> {
  const langs: Lang[] = ['pt', 'en', 'de', 'es', 'it'];
  const result: Partial<Record<Lang, string>> = {};

  for (const lang of langs) {
    const filePath = path.join(READMES_DIR, slug, `${lang}.md`);
    try {
      result[lang] = fs.readFileSync(filePath, 'utf-8');
    } catch {
      // file doesn't exist yet for this lang
    }
  }

  return result;
}
