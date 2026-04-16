# Portfolio Redesign — Design Spec
**Data:** 2026-04-16
**Status:** Aprovado

---

## Visão Geral

Redesign completo do portfólio de Arthur Simões com quatro pilares:

1. **Sistema de temas** — 3 paletas neutras com entrada interativa estilo game
2. **i18n build-time** — 5 idiomas (PT, EN, DE, ES, IT) via MyMemory API, zero API em produção
3. **README ao vivo** — conteúdo dos projetos pré-traduzido via script de build
4. **Hierarquia e posicionamento** — reestruturação de seções, copy mais forte, nova seção de stack

---

## 1. Arquitetura Geral

### Estado persistido (localStorage)

| Chave | Valores | Quando define |
|---|---|---|
| `portfolio-theme` | `a` / `b` / `c` | Tela de entrada (primeira visita) |
| `portfolio-lang` | `pt` / `en` / `de` / `es` / `it` | Toggle no header |

### Fluxo de primeira visita
```
Acessa "/" → sem portfolio-theme → renderiza EntryScreen
→ usuário escolhe paleta → salva localStorage
→ fade-out → carrega portfólio com tema e idioma aplicados
```

### Fluxo de visita recorrente
```
Acessa "/" → lê theme + lang do localStorage → aplica diretamente → portfólio carrega
```

### i18n em build-time
```
scripts/translate.ts
  ├── lê src/locales/pt.json (fonte da verdade)
  ├── busca README de cada projeto via GitHub API
  ├── traduz tudo via MyMemory API → en, de, es, it
  ├── salva src/locales/{lang}.json
  └── salva src/data/readmes/{slug}/{lang}.md
```
Nenhuma chamada de API externa em produção. Script roda via `npm run translate` a cada atualização de conteúdo.

---

## 2. Sistema de Temas

### 3 Paletas

| ID | Nome | Background | Accent | Texto |
|---|---|---|---|---|
| `a` | Marinho + Gelo (padrão) | `#12151e` | `#5b8db8` | `#ccd8e4` |
| `b` | Cimento + Aço | `#1a1a1e` | `#4a6fa5` | `#c8d0d8` |
| `c` | Concreto + Madeira | `#17171a` | `#8a8070` | `#c0bab2` |

### Implementação
- CSS custom properties definidas em `src/styles/themes.css`
- Tema aplicado como `data-theme="a|b|c"` no elemento `<html>`
- Todos os componentes usam `var(--accent)`, `var(--bg)`, `var(--text)`, `var(--surface)`, `var(--muted)`
- Troca de tema: atualiza o atributo + salva localStorage. Sem re-render de página.

### Toggle de tema no header
- Ícone discreto abre mini popover com 3 swatches circulares
- Troca instantânea com transição CSS de 0.4s

---

## 3. Tela de Entrada (EntryScreen)

### Comportamento
- Renderizada em `page.tsx` quando `localStorage['portfolio-theme']` não existe
- Leitura do localStorage feita em `useEffect` para evitar hydration mismatch no Next.js (SSR não acessa localStorage)
- Paleta **A (Marinho)** pré-selecionada como padrão
- Ao clicar em um card: página inteira muda para aquela paleta (fundo, linhas, botão)
- Botão "Entrar" visível desde o início (paleta padrão já selecionada)
- Ao confirmar: fade-out de 0.6s → portfólio carrega

### Layout
```
[Label: Arthur Simões — Portfólio]
[Título: "Para entrar, escolha seu tema"]
[Subtítulo: "Você pode alterar a qualquer momento"]

[01 - Marinho + Gelo] [02 - Cimento + Aço] [03 - Concreto + Madeira]
        ↑ selecionado por padrão

[Botão: Entrar]
[Hint: Tema salvo automaticamente]
```

### Piano Lines (verticais, globais)
- Componente `PianoLines` fixo, `pointer-events: none`, `z-index: 0`
- **3 espessuras** com comportamentos distintos:
  - Finas (1px): 6 linhas, rápidas (2.4–3.5s), opacidade 0.16–0.22
  - Médias (2px): 3 linhas, lentas (4.3–5.5s), opacidade 0.11–0.13
  - Grossas (3px): 2 linhas, muito lentas (7–9s), opacidade 0.06–0.07
- Animação `fall`: entram do topo, saem pela base, fade in/out suave
- Cor das linhas muda junto com o tema (CSS transition 0.6s)
- Mini-linhas dentro dos cards de preview (mesma lógica, escala menor)
- Presentes em todas as páginas via layout raiz

---

## 4. Sistema de Idiomas (i18n)

### Idiomas suportados
`pt` (padrão) · `en` · `de` · `es` · `it`

### Estrutura de arquivos
```
src/locales/
  pt.json        ← editado manualmente (fonte da verdade)
  en.json        ← gerado
  de.json        ← gerado
  es.json        ← gerado
  it.json        ← gerado

src/data/readmes/
  {slug}/
    pt.md  en.md  de.md  es.md  it.md
```

### O que é traduzido
- Todos os textos de UI: nav, botões, labels, status badges
- Hero: título, subtítulo, CTAs
- About: bio completa, títulos dos cards de skill
- Projects: título, descrição de cada projeto
- Contact: copy, labels de links
- READMEs completos de cada projeto

### Runtime
- `LanguageContext` carrega o JSON do idioma ativo
- Hook `useT()` retorna `t('chave.aninhada')`
- Troca de idioma: re-render instantâneo, sem reload
- Idioma salvo em `localStorage['portfolio-lang']`

### Toggle no header
- 5 siglas: `PT · EN · DE · ES · IT`
- Ativo destacado com cor `--accent` do tema
- Aparece ao lado do toggle de tema

### Script de tradução
```bash
npm run translate
```
- Lê `src/locales/pt.json`
- Extrai owner/repo do campo `githubUrl` de cada projeto em `projects.ts` (ex: `github.com/ruhtraleugim/SaaS-Microservices`)
- Busca README via `fetch(https://api.github.com/repos/{owner}/{repo}/readme)`
- Decodifica base64
- Envia para MyMemory API em lotes (respeita limite de 5.000 palavras/dia)
- Salva JSONs e markdowns gerados
- Deve ser commitado junto com updates de conteúdo

---

## 5. Projetos — README ao vivo (pré-traduzido)

### Página de projeto (`/projects/[slug]`)
- Conteúdo principal: arquivo `src/data/readmes/{slug}/{lang}.md` renderizado como markdown
- Fallback 1: se o arquivo do idioma não existir, usa `pt.md`
- Fallback 2: se `pt.md` não existir (projeto sem README no GitHub), usa campo `content` de `projects.ts`
- Biblioteca de renderização: `react-markdown` + `rehype-highlight` para syntax highlighting
- Remove a necessidade do campo `content` manual em `projects.ts` (mantém por retrocompatibilidade enquanto migra)

### Sidebar (mantida)
- Tags de tecnologia
- Links: GitHub e liveUrl (quando disponível)
- Status badge

### Bug fix
- `Projects.tsx`: corrige `<div className={styles.cardImage} />` para renderizar `project.image` corretamente via `next/image`

---

## 6. Hierarquia e Posicionamento

### Nova ordem de seções
```
EntryScreen (primeira visita)
Header (fixo)
Hero
Stack (nova)
About
Projects
Contact
```

### Hero — copy reescrito
**Headline:** *"Sistemas que não caem."*
**Subtítulo:** Backend · DevSecOps · Arquitetura Distribuída
**CTA primário:** Ver Projetos
**CTA secundário:** Entrar em Contato

### Stack (nova seção)
- Grade com tecnologias principais: Java, Spring Boot, PostgreSQL, Cassandra, Redis, Docker, Spring Security, Next.js
- Cada item: ícone simples (SVG) + nome + barra fina de proficiência
- Sem texto — visual scanning imediato
- Posicionada entre Hero e About para dar contexto técnico antes da bio

### About — reescrito
1. Resultado entregue (abertura)
2. Stack e especialização
3. Personalidade e método
4. Fundador de software house (sem ambiguidade de disponibilidade)

### Contact — copy mais forte
**CTA antes dos links:**
> *"Se você tem um sistema crítico pra construir, eu tenho interesse."*

---

## 7. Metadata e SEO

- `layout.tsx`: atualizar title para `"Arthur Simões | Backend · DevSecOps"`
- Adicionar Open Graph tags: `og:title`, `og:description`, `og:image` (imagem gerada ou estática)
- Adicionar `public/robots.txt` e `public/sitemap.xml` básico

---

## Decisões Técnicas

| Decisão | Escolha | Motivo |
|---|---|---|
| Tradução | Build-time via MyMemory | Zero API em produção, simples |
| README | Pré-traduzido no build | Sem rate limit em produção |
| Tema | CSS custom properties + data-attr | Troca instantânea sem JS complexo |
| i18n runtime | Context + hook `useT()` | Leve, sem biblioteca externa |
| Markdown | `react-markdown` + `rehype-highlight` | Padrão Next.js, leve |
| Piano lines | CSS animation pura | Zero dependência, performático |

---

## Fora de Escopo

- Backend próprio ou servidor de tradução
- CMS externo
- Formulário de contato funcional (mantém links diretos)
- Autenticação ou área admin
