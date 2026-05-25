export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  content: string;
  language: 'Java' | 'Python' | 'TypeScript' | 'wip';
  wip?: true;
  githubUrl?: string;
  liveUrl?: string;
  status?: 'Em Desenvolvimento' | 'Concluído' | 'Planejado';
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'saas-microservices',
    title: 'SaaS Microservices',
    description: 'Arquitetura distribuída baseada em microsserviços com separação de domínios.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
    image: '/projects/server.png',
    language: 'Java',
    status: 'Concluído',
    githubUrl: 'https://github.com/ruhtraleugim/SaaS-Microservices',
    content: `
      <h2>Visão Geral</h2>
      <p>Sistema SaaS baseado em arquitetura de microsserviços com foco em separação de responsabilidades.</p>
      <h3>Arquitetura</h3>
      <ul>
        <li>Separação por domínio de serviço</li>
        <li>Comunicação entre serviços</li>
        <li>Containerização com Docker</li>
        <li>Estrutura orientada a escalabilidade</li>
      </ul>
    `,
  },
  {
    id: '2',
    slug: 'auth-checklist-security',
    title: 'API Auth / Security Checklist Service',
    description: 'Serviço de autenticação e checklist de segurança com forte foco em hardening e validações.',
    tags: ['Java', 'Spring Security', 'JWT', 'Security'],
    image: '/projects/security.png',
    language: 'Java',
    status: 'Concluído',
    githubUrl: 'https://github.com/ruhtraleugim/Checklist',
    content: `
      <h2>Visão Geral</h2>
      <p>Projeto simples transformado em estudo de segurança aplicada e controle de acesso.</p>
      <h3>Funcionalidades</h3>
      <ul>
        <li>Autenticação com JWT</li>
        <li>Controle de acesso básico</li>
        <li>Regras de segurança aplicadas manualmente</li>
        <li>Validações estruturadas de entrada</li>
      </ul>
      <h3>Objetivo</h3>
      <p>Transformar um sistema simples em exercício de aplicação prática de segurança backend.</p>
    `,
  },
  {
    id: '3',
    slug: 'url-shortener-enterprise',
    title: 'URL Shortener Enterprise',
    description: 'Sistema de encurtamento de URLs com cache e persistência distribuída.',
    tags: ['Java', 'Spring Boot', 'Redis', 'Cassandra'],
    image: '/projects/server.png',
    language: 'Java',
    status: 'Concluído',
    githubUrl: 'https://github.com/ruhtraleugim/EncurtadorDeUrl',
    content: `
      <h2>Visão Geral</h2>
      <p>Sistema de encurtamento de URLs com foco em performance e leitura otimizada.</p>
      <h3>Stack</h3>
      <ul>
        <li>Redis para cache de alta velocidade</li>
        <li>Cassandra para persistência escalável</li>
        <li>Base62 encoding</li>
        <li>Arquitetura em camadas</li>
      </ul>
      <h3>Funcionalidades</h3>
      <ul>
        <li>Encurtamento com TTL</li>
        <li>Redirecionamento otimizado</li>
      </ul>
    `,
  },
  {
    id: '4',
    slug: 'inventario-desafio-1-hora',
    title: 'Sistema de Inventário (Desafio 1 hora)',
    description: 'API de inventário construída como desafio técnico com foco em velocidade e estrutura.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL'],
    image: '/projects/dashboard.png',
    language: 'Java',
    status: 'Concluído',
    githubUrl: 'https://github.com/ruhtraleugim/Gerenciador-De-Inventario-Desafio-1-hora',
    content: `
      <h2>Visão Geral</h2>
      <p>Projeto desenvolvido como desafio rápido de implementação backend.</p>
      <h3>Características</h3>
      <ul>
        <li>CRUD básico de inventário</li>
        <li>Estrutura simples e funcional</li>
        <li>Foco em entrega rápida</li>
        <li>API REST organizada</li>
      </ul>
    `,
  },
  {
    id: '5',
    slug: 'livraria-distribuida',
    title: 'Livraria Distribuída (Fullstack)',
    description: 'Sistema de compartilhamento de arquivos com backend e frontend separados.',
    tags: ['Python', 'Flask', 'Vue.js', 'RabbitMQ', 'Docker'],
    image: '/projects/dashboard.png',
    language: 'Python',
    status: 'Concluído',
    githubUrl: 'https://github.com/ruhtraleugim/RestAPI-com-Python-e-Flask',
    content: `
      <h2>Visão Geral</h2>
      <p>Sistema distribuído de compartilhamento de arquivos com arquitetura fullstack.</p>
      <h3>Backend</h3>
      <ul>
        <li>Flask API</li>
        <li>RabbitMQ para mensageria</li>
        <li>PostgreSQL</li>
        <li>JWT authentication</li>
      </ul>
      <h3>Frontend</h3>
      <ul>
        <li>Vue.js</li>
        <li>Consumo de API REST</li>
        <li>Interface simples de upload/download</li>
      </ul>
      <h3>Infra</h3>
      <ul>
        <li>Docker / Docker Compose</li>
      </ul>
    `,
  },
  {
    id: '6',
    slug: 'clarvis',
    title: 'Clarvis',
    description: 'Companion IA de voz para ADHD. Pipeline completo: microfone → STT → LLM → TTS.',
    tags: ['Python', 'TypeScript', 'Docker', 'Whisper', 'Gemma'],
    image: '/projects/server.png',
    language: 'Python',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Companion de voz com IA para auxílio a pessoas com ADHD. Pipeline completo com baixa latência.</p>
      <h3>Arquitetura</h3>
      <ul>
        <li>STT com Whisper rodando em Docker</li>
        <li>Orquestrador Python/asyncio</li>
        <li>LLM via OpenRouter (Gemma)</li>
        <li>TTS com síntese de voz local</li>
        <li>Comunicação inter-serviços via JSON atômico em volume compartilhado</li>
      </ul>
    `,
  },
  {
    id: '7',
    slug: 'norte',
    title: 'Norte',
    description: 'PWA de organização pessoal com sistema comportamental progressivo e Behavioral Confidence Score.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Vercel'],
    image: '/projects/dashboard.png',
    language: 'TypeScript',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>PWA de organização pessoal com sistema comportamental que mede intenção real via lead time.</p>
      <h3>Funcionalidades</h3>
      <ul>
        <li>Behavioral Confidence Score (BCS) com decay temporal</li>
        <li>Sistema de rituais e streak diário</li>
        <li>Revisão semanal automatizada</li>
        <li>Prompt de IA contextual baseado em comportamento</li>
        <li>Deploy em produção no Vercel</li>
      </ul>
    `,
  },
  {
    id: '8',
    slug: 'speone',
    title: 'SpeOne',
    description: 'Plataforma backend multi-tenant com autenticação JWT e isolamento via Hibernate Filters.',
    tags: ['Java', 'Spring Boot 4', 'JWT', 'Hibernate', 'PostgreSQL'],
    image: '/projects/server.png',
    language: 'Java',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Fundação backend multi-tenant empresarial construída com Spring Boot 4.0.6.</p>
      <h3>Funcionalidades</h3>
      <ul>
        <li>JWT stateless com cookies HTTP-only</li>
        <li>Isolamento multi-tenant via Hibernate @FilterDef/@Filter</li>
        <li>Organização package-by-feature com SOLID</li>
        <li>Suite de testes completa</li>
      </ul>
    `,
  },
  {
    id: '9',
    slug: 'barbearia-template',
    title: 'Barbearia Template',
    description: 'Template de landing page profissional para barbearias com 3 temas visuais distintos.',
    tags: ['TypeScript', 'Next.js'],
    image: '/projects/dashboard.png',
    language: 'TypeScript',
    status: 'Concluído',
    content: `
      <h2>Visão Geral</h2>
      <p>Template de landing page para barbearias com foco em conversão e identidade visual.</p>
      <h3>Características</h3>
      <ul>
        <li>3 temas visuais distintos</li>
        <li>7 seções completas</li>
        <li>Deploy automático no Vercel</li>
        <li>Configuração centralizada via config.js</li>
      </ul>
    `,
  },
  {
    id: '10',
    slug: 'leadmanager',
    title: 'LeadManager',
    description: '',
    tags: [],
    image: '/projects/dashboard.png',
    language: 'wip',
    wip: true,
    content: '',
  },
];
