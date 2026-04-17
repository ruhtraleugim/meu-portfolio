import fs from 'fs';
import path from 'path';

const TARGET_LANGS = ['en', 'de', 'es', 'it'] as const;
type TargetLang = typeof TARGET_LANGS[number];

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      result[key] = v;
    } else if (typeof v === 'object' && v !== null) {
      Object.assign(result, flatten(v as Record<string, unknown>, key));
    }
  }
  return result;
}

function unflatten(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let cur: Record<string, unknown> = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in cur)) cur[parts[i]] = {};
      cur = cur[parts[i]] as Record<string, unknown>;
    }
    cur[parts[parts.length - 1]] = value;
  }
  return result;
}

async function translate(text: string, from: string, to: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}&de=amsbsimoes@gmail.com`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory API error: ${res.status}`);
  const data = await res.json() as { responseData: { translatedText: string } };
  return data.responseData.translatedText;
}

async function translateBatch(
  entries: [string, string][],
  fromLang: string,
  toLang: string
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const [key, text] of entries) {
    try {
      const translated = await translate(text, fromLang, toLang);
      result[key] = translated;
      console.log(`  [${toLang}] ${key}: ${translated.slice(0, 60)}...`);
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`  Error translating [${key}]:`, err);
      result[key] = text;
    }
  }
  return result;
}

function extractOwnerRepo(githubUrl: string): { owner: string; repo: string } | null {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github.v3+json' } });
  if (!res.ok) {
    console.warn(`  README not found for ${owner}/${repo}`);
    return null;
  }
  const data = await res.json() as { content: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

async function main() {
  const localesDir = path.join(process.cwd(), 'src/locales');
  const readmesDir = path.join(process.cwd(), 'src/data/readmes');

  const ptPath = path.join(localesDir, 'pt.json');
  const ptRaw = JSON.parse(fs.readFileSync(ptPath, 'utf-8'));
  const flatPt = flatten(ptRaw);
  const entries = Object.entries(flatPt);

  console.log(`Translating ${entries.length} keys to ${TARGET_LANGS.length} languages...\n`);

  for (const lang of TARGET_LANGS) {
    console.log(`\n── ${lang.toUpperCase()} ──`);
    const translated = await translateBatch(entries, 'pt', lang);
    const nested = unflatten(translated);
    fs.writeFileSync(
      path.join(localesDir, `${lang}.json`),
      JSON.stringify(nested, null, 2),
      'utf-8'
    );
    console.log(`  Saved src/locales/${lang}.json`);
  }

  const { projects } = await import('../src/data/projects');

  console.log(`\nFetching and translating READMEs for ${projects.length} projects...\n`);

  for (const project of projects) {
    const projectReadmesDir = path.join(readmesDir, project.slug);
    fs.mkdirSync(projectReadmesDir, { recursive: true });

    const parsed = project.githubUrl ? extractOwnerRepo(project.githubUrl) : null;
    let ptReadme: string | null = null;

    if (parsed) {
      console.log(`\n── ${project.slug} ──`);
      ptReadme = await fetchReadme(parsed.owner, parsed.repo);
    }

    if (ptReadme) {
      fs.writeFileSync(path.join(projectReadmesDir, 'pt.md'), ptReadme, 'utf-8');
      console.log(`  Saved pt.md (${ptReadme.length} chars)`);

      for (const lang of TARGET_LANGS) {
        try {
          const translated = await translate(ptReadme, 'pt', lang);
          fs.writeFileSync(path.join(projectReadmesDir, `${lang}.md`), translated, 'utf-8');
          console.log(`  Saved ${lang}.md`);
          await new Promise((r) => setTimeout(r, 500));
        } catch (err) {
          console.error(`  Error translating README to ${lang}:`, err);
          fs.writeFileSync(path.join(projectReadmesDir, `${lang}.md`), ptReadme, 'utf-8');
        }
      }
    } else {
      console.log(`  No GitHub README for ${project.slug}, skipping.`);
    }
  }

  console.log('\n✓ Translation complete.');
}

main().catch(console.error);
