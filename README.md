# AAPOC — Plataforma Web Institucional & API

Projeto institucional da **AAPOC MT — Associação de Apoio aos Pacientes Oncológicos de Cuiabá**, desenvolvido como atividade de extensão universitária para apresentar a associação, seus projetos, equipe multidisciplinar, galeria de ações e gerenciar o voluntariado e acolhimento de pacientes.

## Estrutura do Projeto (Monorepo)

```text
AAPOC/
├── frontend/                  # Aplicação Web (React 18 + TypeScript + Vite)
│   ├── src/                   # Componentes, páginas, hooks e serviços
│   ├── public/                # Imagens e arquivos estáticos
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                   # API REST (Django + Django REST Framework)
│   ├── core/                  # Configurações globais (settings, urls, wsgi)
│   ├── requirements.txt       # Dependências Python
│   ├── manage.py              # CLI do Django
│   ├── .env.example           # Modelo de variáveis de ambiente
│   └── .env                   # Variáveis de ambiente locais
│
├── .gitignore
└── README.md
```

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** + **TypeScript**
- **Vite** — bundler ultrarrápido
- **Tailwind CSS** — estilização utilitária
- **shadcn/ui** + **Radix UI** — biblioteca de componentes acessíveis
- **TanStack Query (React Query)** — gerenciamento de estado assíncrono e cache
- **React Hook Form** + **Zod** — validação robusta de formulários

### Backend
- **Python 3.12**
- **Django 5.1** + **Django REST Framework (DRF)**
- **drf-spectacular** — documentação OpenAPI 3.0 & Swagger UI
- **django-cors-headers** — integração segura com o frontend
- **SQLite** (desenvolvimento local) / **PostgreSQL** (produção)

---

## 🚀 Como Rodar o Projeto

### 1. Rodando o Frontend

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências (caso ainda não tenha feito)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```
Acesse em seu navegador: [http://localhost:5173](http://localhost:5173)

### 2. Rodando o Backend (Django)

```bash
# Entrar na pasta do backend
cd backend

# Criar o ambiente virtual (primeira vez)
python -m venv venv

# Ativar o ambiente virtual:
# No Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# No Linux/Mac:
# source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Aplicar migrações do banco de dados
python manage.py migrate

# Iniciar o servidor da API
python manage.py runserver
```
A API estará disponível em: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📚 Documentação da API

Com o backend rodando, você pode acessar a documentação interativa:
- **Swagger UI:** [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
- **ReDoc:** [http://127.0.0.1:8000/api/redoc/](http://127.0.0.1:8000/api/redoc/)
- **OpenAPI Schema (YAML/JSON):** [http://127.0.0.1:8000/api/schema/](http://127.0.0.1:8000/api/schema/)
- **Painel Administrativo:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 📞 Contato da Associação

- **Endereço:** Av. São Sebastião, 4160 — São Mateus, Cuiabá - MT
- **WhatsApp:** (65) 99216-2284
- **Instagram:** [@aapoc.oficial](https://www.instagram.com/aapoc.oficial/)
