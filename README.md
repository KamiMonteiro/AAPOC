# AAPOC — Plataforma Web Institucional & API

Projeto institucional da **AAPOC MT — Associação de Apoio aos Pacientes Oncológicos de Cuiabá**, desenvolvido como atividade de extensão universitária para apresentar a associação, seus projetos, equipe multidisciplinar, galeria de ações e gerenciar o voluntariado e acolhimento de pacientes.

---

## 🌐 Publicação do Sistema Online (Ambiente de Produção)

| Recurso | Endereço URL | Descrição |
| :--- | :--- | :--- |
| **Painel Administrativo CMS (Oficial)** | [https://painel.aapoccba.com.br](https://painel.aapoccba.com.br) | Acesso direto ao CMS de gestão da AAPOC (Unfold Theme). |
| **Painel Administrativo (Rota `/admin/`)** | [https://painel.aapoccba.com.br/admin/](https://painel.aapoccba.com.br/admin/) | Acesso administrativo padrão Django. |
| **Documentação Interativa Swagger (OpenAPI 3.0)** | [https://painel.aapoccba.com.br/api/docs/](https://painel.aapoccba.com.br/api/docs/) | Interface interativa de teste de todos os endpoints REST. |
| **Documentação ReDoc** | [https://painel.aapoccba.com.br/api/redoc/](https://painel.aapoccba.com.br/api/redoc/) | Especificação técnica dos contratos e esquemas da API. |
| **Servidor em Nuvem (Render)** | [https://aapoc-backend.onrender.com](https://aapoc-backend.onrender.com) | Host de infraestrutura com SSL e balanceamento automático. |

> **🔒 Acesso Administrativo:**
> As credenciais de acesso para avaliação acadêmica são enviadas diretamente na submissão privada do projeto no ambiente acadêmico (AVA) por boas práticas de segurança.

---

## 📄 Documentação Acadêmica & Diagramas

Para atender integralmente aos requisitos da atividade universitária, consulte os documentos detalhados disponíveis neste repositório:

- 📑 **[Documentação Técnica e Acadêmica Completa (DOCUMENTACAO_PROJETO_AAPOC.md)](DOCUMENTACAO_PROJETO_AAPOC.md):**
  - Identificação institucional e repositório.
  - Endereços e acessos ao sistema em produção.
  - **Diagrama Entidade-Relacionamento (DER)** em formato Mermaid e Dicionário de Dados exaustivo.
  - Decisões de arquitetura, boas práticas e conformidade com LGPD.
  - Resultados da suíte de testes automatizados (12/12 backend, 2/2 frontend).
- 🗄️ **[Script DDL de Criação do Banco de Dados (backend/database_schema.sql)](backend/database_schema.sql):**
  - Código SQL puro com instruções `CREATE TABLE`, índices, restrições e integridade referencial.
- ⚙️ **Arquivos de Migração do Django ORM:**
  - `backend/voluntarios/migrations/`
  - `backend/galeria/migrations/`
  - `backend/projetos/migrations/`

---

## 🏗️ Estrutura do Projeto (Monorepo)

```text
AAPOC/
├── frontend/                  # Aplicação Web (React 18 + TypeScript + Vite)
│   ├── src/
│   │   ├── components/        # Componentes visuais (Hero, Projetos, Galeria, Voluntariado...)
│   │   ├── services/          # Integração HTTP com a API REST
│   │   ├── hooks/             # Hooks de consulta com TanStack Query
│   │   └── types/             # Tipagens TypeScript
│   ├── public/                # Imagens e arquivos estáticos
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                   # API REST (Django 5.1 + Django REST Framework)
│   ├── core/                  # Configurações globais (settings, urls, wsgi)
│   ├── voluntarios/           # Módulo de cadastro, validação e notificação de voluntários
│   ├── galeria/               # CMS de fotos e momentos com carrossel dinâmico
│   ├── projetos/              # CMS de projetos institucionais e modais informativos
│   ├── database_schema.sql    # DDL SQL de criação das tabelas do banco de dados
│   ├── requirements.txt       # Dependências Python
│   ├── manage.py              # CLI do Django
│   └── .env.example           # Modelo de variáveis de ambiente
│
├── DOCUMENTACAO_PROJETO_AAPOC.md # Relatório acadêmico completo com DER e arquitetura
├── .gitignore
└── README.md
```

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** + **TypeScript**
- **Vite** — bundler ultrarrápido
- **Tailwind CSS** — estilização utilitária moderna
- **shadcn/ui** + **Radix UI** — componentes acessíveis
- **TanStack Query (React Query)** — cache e sincronização assíncrona
- **React Hook Form** + **Zod** — validação robusta de formulários

### Backend
- **Python 3.12** + **Django 5.1**
- **Django REST Framework (DRF)** — endpoints RESTful
- **Django Unfold** — interface administrativa moderna e responsiva
- **drf-spectacular** — documentação OpenAPI 3.0 / Swagger UI
- **django-cors-headers** — segurança e CORS habilitado
- **SQLite** (desenvolvimento) / **PostgreSQL** (produção)

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Rodando o Frontend

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```
Acesse em seu navegador: [http://localhost:5173](http://localhost:5173)

### 2. Rodando o Backend (Django)

```bash
# Entrar na pasta do backend
cd backend

# Criar o ambiente virtual (se primeira vez)
python -m venv venv

# Ativar o ambiente virtual:
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Windows (Git Bash):
source venv/Scripts/activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Aplicar migrações do banco de dados
python manage.py migrate

# Popular dados iniciais de projetos e galeria
python manage.py popular_projetos
python manage.py popular_galeria

# Iniciar o servidor da API
python manage.py runserver
```
A API e Painel estarão disponíveis em:
- **Painel Administrativo:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **Swagger Docs:** [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)

---

## 🧪 Testes Automatizados

```bash
# Testes do Backend
cd backend
python manage.py test

# Testes do Frontend
cd frontend
npm test
```

---

## 📍 Contato da Associação

- **Endereço:** Av. São Sebastião, 4160 — São Mateus, Cuiabá - MT
- **WhatsApp:** (65) 99216-2284
- **Instagram:** [@aapoc.oficial](https://www.instagram.com/aapoc.oficial/)
