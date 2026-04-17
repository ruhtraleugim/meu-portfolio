# Portfolio Finalização Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finalizar o portfolio: renomear branch, commitar arquivos pendentes, gerar READMEs faltantes e verificar o build.

**Architecture:** 3 agentes independentes executados em paralelo. Agente A cuida de housekeeping git. Agente B corrige e completa a página de projetos. Agente C verifica o build final.

**Tech Stack:** Next.js 15, TypeScript, Git, Node.js

---

## Agente A — Housekeeping Git

**Files:**
- No files created/modified — apenas operações git

### Task A1: Renomear branch master → principal

- [ ] **Step 1: Renomear branch localmente**

```bash
git branch -m master principal
```

Expected: sem output (sucesso silencioso)

- [ ] **Step 2: Confirmar rename**

```bash
git branch -a
```

Expected: `* principal` na listagem, sem `master`

- [ ] **Step 3: Commitar README.md**

```bash
git add README.md
git commit -m "docs: add project README"
```

- [ ] **Step 4: Commitar favicon e imagens de projetos**

```bash
git add src/app/favicon.ico public/projects/
git commit -m "assets: add favicon and project images"
```

- [ ] **Step 5: Deletar arquivos Next.js padrão não utilizados**

`src/app/page.module.css` não é importado em nenhum arquivo. Os SVGs `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` são do scaffolding padrão do Next.js e não são usados no portfolio.

```bash
rm src/app/page.module.css public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
git status
```

Expected: os arquivos deixam de aparecer no untracked (foram deletados antes de serem rastreados, então basta confirmação com `git status` que não os lista mais).

---

## Agente B — Projetos: READMEs faltantes

**Files:**
- Create: `src/data/readmes/saas-microservices/pt.md`
- Create: `src/data/readmes/saas-microservices/en.md`
- Create: `src/data/readmes/saas-microservices/de.md`
- Create: `src/data/readmes/saas-microservices/es.md`
- Create: `src/data/readmes/saas-microservices/it.md`
- Create: `src/data/readmes/livraria-distribuida/pt.md`
- Create: `src/data/readmes/livraria-distribuida/en.md`
- Create: `src/data/readmes/livraria-distribuida/de.md`
- Create: `src/data/readmes/livraria-distribuida/es.md`
- Create: `src/data/readmes/livraria-distribuida/it.md`

### Task B1: Criar READMEs para saas-microservices

O projeto `saas-microservices` não tem arquivos de README em `src/data/readmes/saas-microservices/`. A página de projeto usa `fallbackHtml` quando não há README, mas é melhor ter o conteúdo estruturado em Markdown.

- [ ] **Step 1: Criar diretório**

```bash
mkdir -p src/data/readmes/saas-microservices
```

- [ ] **Step 2: Criar README PT**

Criar `src/data/readmes/saas-microservices/pt.md`:

```markdown
# SaaS Microservices

## Visão Geral

Sistema SaaS baseado em arquitetura de microsserviços com foco em separação de domínios e escalabilidade horizontal.

## Arquitetura

O projeto divide responsabilidades em serviços independentes que se comunicam via APIs REST. Cada domínio possui seu próprio serviço, banco de dados e ciclo de deploy.

## Funcionalidades

- **Separação por domínio** — cada microsserviço é responsável por um contexto de negócio isolado
- **Containerização com Docker** — todos os serviços rodam em containers para garantir consistência entre ambientes
- **Comunicação entre serviços** — via chamadas REST com contratos bem definidos
- **Escalabilidade horizontal** — cada serviço pode ser escalado independentemente

## Stack

- Java 17 + Spring Boot
- Docker / Docker Compose
- REST APIs
- PostgreSQL por serviço

## Como Rodar

```bash
docker-compose up --build
```

Acesse os serviços nas portas configuradas no `docker-compose.yml`.
```

- [ ] **Step 3: Criar README EN**

Criar `src/data/readmes/saas-microservices/en.md`:

```markdown
# SaaS Microservices

## Overview

SaaS system built on a microservices architecture, focused on domain separation and horizontal scalability.

## Architecture

Responsibilities are split into independent services that communicate via REST APIs. Each domain has its own service, database, and deployment cycle.

## Features

- **Domain separation** — each microservice owns an isolated business context
- **Docker containerization** — all services run in containers for environment consistency
- **Inter-service communication** — via REST calls with well-defined contracts
- **Horizontal scalability** — each service can be scaled independently

## Stack

- Java 17 + Spring Boot
- Docker / Docker Compose
- REST APIs
- PostgreSQL per service

## Running Locally

```bash
docker-compose up --build
```

Access services on the ports configured in `docker-compose.yml`.
```

- [ ] **Step 4: Criar README DE**

Criar `src/data/readmes/saas-microservices/de.md`:

```markdown
# SaaS Microservices

## Überblick

SaaS-System auf Basis einer Microservices-Architektur mit Fokus auf Domänentrennung und horizontale Skalierbarkeit.

## Architektur

Verantwortlichkeiten sind in unabhängige Services aufgeteilt, die über REST-APIs kommunizieren. Jede Domäne hat ihren eigenen Service, ihre eigene Datenbank und ihren eigenen Deployment-Zyklus.

## Funktionen

- **Domänentrennung** — jeder Microservice verantwortet einen isolierten Geschäftsbereich
- **Docker-Containerisierung** — alle Services laufen in Containern
- **Service-zu-Service-Kommunikation** — via REST mit klar definierten Schnittstellen
- **Horizontale Skalierbarkeit** — jeder Service kann unabhängig skaliert werden

## Stack

- Java 17 + Spring Boot
- Docker / Docker Compose
- REST APIs
- PostgreSQL pro Service

## Lokal Starten

```bash
docker-compose up --build
```
```

- [ ] **Step 5: Criar README ES**

Criar `src/data/readmes/saas-microservices/es.md`:

```markdown
# SaaS Microservices

## Descripción General

Sistema SaaS basado en arquitectura de microservicios con foco en separación de dominios y escalabilidad horizontal.

## Arquitectura

Las responsabilidades se dividen en servicios independientes que se comunican vía APIs REST. Cada dominio tiene su propio servicio, base de datos y ciclo de despliegue.

## Funcionalidades

- **Separación por dominio** — cada microservicio es responsable de un contexto de negocio aislado
- **Containerización con Docker** — todos los servicios corren en contenedores
- **Comunicación entre servicios** — vía REST con contratos bien definidos
- **Escalabilidad horizontal** — cada servicio puede escalarse de forma independiente

## Stack

- Java 17 + Spring Boot
- Docker / Docker Compose
- REST APIs
- PostgreSQL por servicio

## Cómo Ejecutar

```bash
docker-compose up --build
```
```

- [ ] **Step 6: Criar README IT**

Criar `src/data/readmes/saas-microservices/it.md`:

```markdown
# SaaS Microservices

## Panoramica

Sistema SaaS basato su architettura a microservizi, focalizzato sulla separazione dei domini e sulla scalabilità orizzontale.

## Architettura

Le responsabilità sono suddivise in servizi indipendenti che comunicano tramite API REST. Ogni dominio ha il proprio servizio, database e ciclo di deploy.

## Funzionalità

- **Separazione per dominio** — ogni microservizio gestisce un contesto di business isolato
- **Containerizzazione con Docker** — tutti i servizi girano in container
- **Comunicazione tra servizi** — tramite REST con contratti ben definiti
- **Scalabilità orizzontale** — ogni servizio può essere scalato indipendentemente

## Stack

- Java 17 + Spring Boot
- Docker / Docker Compose
- REST APIs
- PostgreSQL per servizio

## Avvio Locale

```bash
docker-compose up --build
```
```

- [ ] **Step 7: Commit saas-microservices READMEs**

```bash
git add src/data/readmes/saas-microservices/
git commit -m "docs: add multilang READMEs for saas-microservices"
```

### Task B2: Criar READMEs para livraria-distribuida

- [ ] **Step 1: Criar diretório**

```bash
mkdir -p src/data/readmes/livraria-distribuida
```

- [ ] **Step 2: Criar README PT**

Criar `src/data/readmes/livraria-distribuida/pt.md`:

```markdown
# Livraria Distribuída

## Visão Geral

API REST para gerenciamento de livraria com arquitetura distribuída, foco em resiliência e separação de responsabilidades.

## Funcionalidades

- **Catálogo de livros** — CRUD completo com busca por título, autor e categoria
- **Gestão de estoque** — controle de disponibilidade e reservas
- **Processamento de pedidos** — fluxo completo de compra com validações
- **Arquitetura distribuída** — serviços desacoplados para maior resiliência

## Stack

- Java 17 + Spring Boot
- Spring Data JPA + PostgreSQL
- Docker / Docker Compose
- REST APIs com validação

## Como Rodar

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:8080`.

## Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/books` | Listar livros |
| POST | `/api/books` | Criar livro |
| GET | `/api/orders` | Listar pedidos |
| POST | `/api/orders` | Criar pedido |
```

- [ ] **Step 3: Criar README EN**

Criar `src/data/readmes/livraria-distribuida/en.md`:

```markdown
# Distributed Bookstore

## Overview

REST API for bookstore management with distributed architecture, focused on resilience and separation of concerns.

## Features

- **Book catalog** — full CRUD with search by title, author, and category
- **Inventory management** — availability control and reservations
- **Order processing** — complete purchase flow with validations
- **Distributed architecture** — decoupled services for greater resilience

## Stack

- Java 17 + Spring Boot
- Spring Data JPA + PostgreSQL
- Docker / Docker Compose
- REST APIs with validation

## Running Locally

```bash
docker-compose up --build
```

API available at `http://localhost:8080`.

## Main Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/books` | List books |
| POST | `/api/books` | Create book |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Create order |
```

- [ ] **Step 4: Criar README DE**

Criar `src/data/readmes/livraria-distribuida/de.md`:

```markdown
# Verteilte Buchhandlung

## Überblick

REST-API für die Buchhandlungsverwaltung mit verteilter Architektur, Fokus auf Resilienz und Trennung von Verantwortlichkeiten.

## Funktionen

- **Buchkatalog** — vollständiges CRUD mit Suche nach Titel, Autor und Kategorie
- **Bestandsverwaltung** — Verfügbarkeitskontrolle und Reservierungen
- **Bestellabwicklung** — vollständiger Kaufablauf mit Validierungen
- **Verteilte Architektur** — entkoppelte Services für höhere Resilienz

## Stack

- Java 17 + Spring Boot
- Spring Data JPA + PostgreSQL
- Docker / Docker Compose
- REST APIs mit Validierung

## Lokal Starten

```bash
docker-compose up --build
```

API verfügbar unter `http://localhost:8080`.
```

- [ ] **Step 5: Criar README ES**

Criar `src/data/readmes/livraria-distribuida/es.md`:

```markdown
# Librería Distribuida

## Descripción General

API REST para gestión de librería con arquitectura distribuida, enfocada en resiliencia y separación de responsabilidades.

## Funcionalidades

- **Catálogo de libros** — CRUD completo con búsqueda por título, autor y categoría
- **Gestión de inventario** — control de disponibilidad y reservas
- **Procesamiento de pedidos** — flujo completo de compra con validaciones
- **Arquitectura distribuida** — servicios desacoplados para mayor resiliencia

## Stack

- Java 17 + Spring Boot
- Spring Data JPA + PostgreSQL
- Docker / Docker Compose
- APIs REST con validación

## Cómo Ejecutar

```bash
docker-compose up --build
```

API disponible en `http://localhost:8080`.
```

- [ ] **Step 6: Criar README IT**

Criar `src/data/readmes/livraria-distribuida/it.md`:

```markdown
# Libreria Distribuita

## Panoramica

API REST per la gestione di una libreria con architettura distribuita, focalizzata su resilienza e separazione delle responsabilità.

## Funzionalità

- **Catalogo libri** — CRUD completo con ricerca per titolo, autore e categoria
- **Gestione inventario** — controllo disponibilità e prenotazioni
- **Elaborazione ordini** — flusso di acquisto completo con validazioni
- **Architettura distribuita** — servizi disaccoppiati per maggiore resilienza

## Stack

- Java 17 + Spring Boot
- Spring Data JPA + PostgreSQL
- Docker / Docker Compose
- REST APIs con validazione

## Avvio Locale

```bash
docker-compose up --build
```

API disponibile su `http://localhost:8080`.
```

- [ ] **Step 7: Commit livraria-distribuida READMEs**

```bash
git add src/data/readmes/livraria-distribuida/
git commit -m "docs: add multilang READMEs for livraria-distribuida"
```

---

## Agente C — Verificação Final

**Files:** nenhum criado/modificado

### Task C1: Build e verificação

**Aguardar Agentes A e B concluírem antes de executar.**

- [ ] **Step 1: Verificar git status está limpo**

```bash
git status
```

Expected: `nothing to commit, working tree clean` (ou apenas `.gitignore` untracked, que é intencional)

- [ ] **Step 2: Rodar build de produção**

```bash
npm run build 2>&1
```

Expected: saída terminando com algo como:
```
Route (app)                              Size     First Load JS
┌ ○ /                                   ...
├ ○ /projects/[slug]                    ...
└ ○ /404                                ...
✓ Compiled successfully
```

- [ ] **Step 3: Verificar todas as rotas de projetos no build**

```bash
npm run build 2>&1 | grep "projects"
```

Expected: todas as 5 rotas de projetos presentes:
- `/projects/saas-microservices`
- `/projects/auth-checklist-security`
- `/projects/url-shortener-enterprise`
- `/projects/inventario-desafio-1-hora`
- `/projects/livraria-distribuida`

- [ ] **Step 4: Verificar branch**

```bash
git branch
```

Expected: `* principal` (sem `master`)

- [ ] **Step 5: Reportar resultado final**

Se build passou e branch é `principal`: missão cumprida.
Se build falhou: reportar o erro exato para investigação.
