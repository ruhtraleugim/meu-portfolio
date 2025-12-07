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
    slug: 'url-shortener-enterprise',
    title: 'URL Shortener Enterprise',
    description: 'Sistema de encurtamento de URLs escalável com Cassandra e Redis.',
    tags: ['Java', 'Spring', 'Cassandra', 'Redis', 'Docker', 'DevSecOps'],
    image: '/projects/server.png',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Projeto de encurtamento de URLs escalável com Cassandra e Redis. Com o foco em mostrar decisões arquiteturais e minha maturidade como desenvolvedor.</p>
      
      <h3>Stack Tecnológica</h3>
      <ul>
        <li><strong>Core:</strong> Java 21 + Spring Boot 7</li>
        <li><strong>Banco de Dados:</strong> Cassandra (leitura rápida)</li>
        <li><strong>Cache:</strong> Redis</li>
        <li><strong>Infra:</strong> Docker</li>
        <li><strong>CI/CD:</strong> GitHub Actions</li>
        <li><strong>Monitoramento:</strong> Prometheus + Grafana</li>
        <li><strong>Segurança:</strong> Autenticação via JWT + Safe Browsing API(Google)</li>
      </ul>

      <h3>Funcionalidades Chave</h3>
      <ul>
        <li>Encurtamento de URLs com TTL configurável</li>
        <li>Rate Limiting para proteção da API</li>
        <li>Autenticação via JWT + Safe Browsing API(Google)</li>
        <li>Pipeline CI/CD com security scan</li>
      </ul>

      <h3>Valor no Portfólio</h3>
      <p>Demonstra capacidade de lidar com alto tráfego e dados distribuídos, alem de corte de custos consideraveis.</p>
    `,
    githubUrl: 'https://github.com/ruhtraleugim/EncurtadorDeUrl',
  },
  {
    id: '2',
    slug: 'auth-service-security',
    title: 'API de Autenticação & Segurança',
    description: 'Serviço centralizado de identidade com OAuth2, RBAC e auditoria.',
    tags: ['Java', 'Spring Security', 'JWT', 'DevSecOps'],
    image: '/projects/security.png',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Implementação robusta de segurança focada em autenticação e autorização real, indo além do básico.</p>
      
      <h3>Funcionalidades</h3>
      <ul>
        <li><strong>Autenticação:</strong> JWT + Refresh Token</li>
        <li><strong>Autorização:</strong> RBAC (Admin, User, Auditor)</li>
        <li><strong>Segurança:</strong> Brute-force protection, Helmet headers</li>
        <li><strong>Auditoria:</strong> Logs estruturados no banco de dados</li>
      </ul>

      <h3>DevSecOps</h3>
      <p>Pipeline com Trivy para scan de vulnerabilidades em imagens Docker e check de segurança no build.</p>
    `,
    githubUrl: 'https://github.com/ruhtraleugim',
  },
  {
    id: '3',
    slug: 'sistema-inventario-2-0',
    title: 'Sistema de Inventário 2.0',
    description: 'Evolução profissional de sistema de gestão com foco em qualidade de código.',
    tags: ['Java', 'Clean Code', 'Swagger', 'PostgreSQL'],
    image: '/projects/dashboard.png',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Versão profissionalizada de um desafio técnico, transformando um MVP em software de produção.</p>
      
      <h3>Melhorias Implementadas</h3>
      <ul>
        <li>Testes unitários e de integração</li>
        <li>Tratamento global de exceções</li>
        <li>Padrão DTO + Mapper</li>
        <li>Documentação via Swagger</li>
        <li>Observabilidade (Logs + Health Checks)</li>
      </ul>
    `,
    githubUrl: 'https://github.com/ruhtraleugim',
  },
  {
    id: '4',
    slug: 'microservicos-reais',
    title: 'Microsserviços: Product & Order',
    description: 'Arquitetura distribuída com comunicação assíncrona via Kafka.',
    tags: ['Microservices', 'Kafka', 'Docker', 'CI/CD'],
    image: '/projects/server.png',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Sistema composto por dois serviços integrados (Product-service e Order-service) demonstrando comunicação entre sistemas.</p>
      
      <h3>Arquitetura</h3>
      <ul>
        <li><strong>Comunicação:</strong> Assíncrona via Kafka (alto impacto) ou REST</li>
        <li><strong>Infraestrutura:</strong> Docker Compose para orquestração</li>
        <li><strong>Segurança:</strong> Gestão segura de secrets</li>
      </ul>

      <h3>DevOps</h3>
      <p>Pipeline CI/CD completo com testes automatizados e scan de segurança.</p>
    `,
    githubUrl: 'https://github.com/ruhtraleugim',
  },
  {
    id: '5',
    slug: 'infraestrutura-como-codigo',
    title: 'Infraestrutura como Código (IaC)',
    description: 'Provisionamento automatizado de infraestrutura AWS com Terraform.',
    tags: ['Terraform', 'AWS', 'DevOps', 'IaC'],
    image: '/projects/server.png', // Fallback to server image
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Repositório focado em IaC, provisionando recursos reais na AWS de forma segura e modular.</p>
      
      <h3>Recursos Provisionados</h3>
      <ul>
        <li>Instâncias EC2</li>
        <li>Security Groups configurados</li>
        <li>Buckets S3</li>
      </ul>

      <h3>Boas Práticas</h3>
      <p>Uso de módulos, variáveis seguras, outputs e documentação técnica detalhada.</p>
    `,
    githubUrl: 'https://github.com/ruhtraleugim',
  },
  {
    id: '6',
    slug: 'app-hardening-owasp',
    title: 'Hardening & OWASP',
    description: 'Aplicação focada em segurança defensiva e documentação de ameaças.',
    tags: ['Security', 'OWASP', 'Hardening', 'Docker'],
    image: '/projects/security.png',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Projeto demonstrando conhecimento avançado em segurança de aplicações e infraestrutura.</p>
      
      <h3>Implementações</h3>
      <ul>
        <li>Checklist OWASP aplicado</li>
        <li>Threat Modeling</li>
        <li>Dockerfile com hardening (usuário não-root, multi-stage)</li>
        <li>Análise estática e Trivy no pipeline</li>
      </ul>
    `,
    githubUrl: 'https://github.com/ruhtraleugim',
  },
  {
    id: '7',
    slug: 'log-observer',
    title: 'Log Observer / Monitoramento',
    description: 'Sistema de observabilidade com Prometheus e Grafana.',
    tags: ['Observability', 'Prometheus', 'Grafana', 'Spring Boot'],
    image: '/projects/dashboard.png',
    status: 'Em Desenvolvimento',
    content: `
      <h2>Visão Geral</h2>
      <p>Mini-projeto focado em instrumentação e monitoramento de aplicações Java.</p>
      
      <h3>Stack</h3>
      <ul>
        <li>Spring Boot com logs estruturados (JSON)</li>
        <li>Prometheus para métricas</li>
        <li>Grafana para visualização</li>
        <li>Alertas básicos configurados</li>
      </ul>
    `,
    githubUrl: 'https://github.com/ruhtraleugim',
  },
];
