export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  content: string;
  githubUrl?: string;
  liveUrl?: string;
  status?: 'Em Desenvolvimento' | 'Concluído | Fase final' | 'Planejado';
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'saas-microservices',
    title: 'SaaS Microservices',
    description: 'Arquitetura distribuída baseada em microsserviços com separação de domínios.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
    image: '/projects/server.png',
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
];
