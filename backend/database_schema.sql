-- =============================================================================
-- AAPOC MT — Associação de Apoio aos Pacientes Oncológicos de Cuiabá
-- Script DDL de Criação do Banco de Dados (PostgreSQL / SQLite / MySQL)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. TABELA DE VOLUNTÁRIOS (Triagem e Acolhimento - LGPD Compliant)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "voluntarios_voluntario" (
    "id" UUID NOT NULL PRIMARY KEY,
    "nome_completo" VARCHAR(150) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "instagram" VARCHAR(60) DEFAULT '',
    "endereco" VARCHAR(255) DEFAULT '',
    "como_deseja_ajudar" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    "observacoes_internas" TEXT DEFAULT '',
    "termo_lgpd_aceito" BOOLEAN NOT NULL DEFAULT TRUE,
    "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL,
    "atualizado_em" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_voluntario_status" ON "voluntarios_voluntario" ("status");
CREATE INDEX IF NOT EXISTS "idx_voluntario_criado_em" ON "voluntarios_voluntario" ("criado_em");


-- -----------------------------------------------------------------------------
-- 2. TABELA DA GALERIA DE FOTOS (CMS de Imagens e Ações Sociais)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "galeria_fotogaleria" (
    "id" UUID NOT NULL PRIMARY KEY,
    "titulo" VARCHAR(150) NOT NULL,
    "imagem" VARCHAR(255) NOT NULL,
    "descricao" TEXT DEFAULT '',
    "data_evento" DATE NOT NULL,
    "link_instagram" VARCHAR(200) DEFAULT '',
    "ativo" BOOLEAN NOT NULL DEFAULT TRUE,
    "ordem" INTEGER NOT NULL DEFAULT 0 CHECK ("ordem" >= 0),
    "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL,
    "atualizado_em" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_galeria_ativo_ordem" ON "galeria_fotogaleria" ("ativo", "ordem");
CREATE INDEX IF NOT EXISTS "idx_galeria_data_evento" ON "galeria_fotogaleria" ("data_evento");


-- -----------------------------------------------------------------------------
-- 3. TABELA DE PROJETOS E INICIATIVAS (CMS de Projetos Institucionais)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "projetos_projeto" (
    "id" UUID NOT NULL PRIMARY KEY,
    "titulo" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(160) NOT NULL UNIQUE,
    "categorias" VARCHAR(100) NOT NULL DEFAULT 'acolhimento',
    "categoria_label" VARCHAR(100) NOT NULL,
    "resumo_impacto" VARCHAR(120) NOT NULL,
    "texto_botao" VARCHAR(60) NOT NULL DEFAULT 'Conhecer Projeto',
    "mes_ano" VARCHAR(60) NOT NULL DEFAULT 'Ação Permanente',
    "imagem" VARCHAR(255) NOT NULL,
    "alt_imagem" VARCHAR(200) DEFAULT '',
    "descricao" TEXT NOT NULL,
    "tagline_modal" VARCHAR(255) DEFAULT '',
    "descricao_modal" TEXT DEFAULT '',
    "ordem" INTEGER NOT NULL DEFAULT 0 CHECK ("ordem" >= 0),
    "ativo" BOOLEAN NOT NULL DEFAULT TRUE,
    "criado_em" TIMESTAMP WITH TIME ZONE NOT NULL,
    "atualizado_em" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_projeto_slug" ON "projetos_projeto" ("slug");
CREATE INDEX IF NOT EXISTS "idx_projeto_ativo_ordem" ON "projetos_projeto" ("ativo", "ordem");


-- -----------------------------------------------------------------------------
-- 4. TABELA DE SEÇÕES DETALHADAS DO MODAL (Relacionamento 1:N com Projeto)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "projetos_secaoprojeto" (
    "id" UUID NOT NULL PRIMARY KEY,
    "projeto_id" UUID NOT NULL REFERENCES "projetos_projeto" ("id") ON DELETE CASCADE,
    "titulo" VARCHAR(150) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0 CHECK ("ordem" >= 0)
);

CREATE INDEX IF NOT EXISTS "idx_secaoprojeto_projeto_id" ON "projetos_secaoprojeto" ("projeto_id");
CREATE INDEX IF NOT EXISTS "idx_secaoprojeto_ordem" ON "projetos_secaoprojeto" ("ordem");


-- -----------------------------------------------------------------------------
-- 5. TABELA DE USUÁRIOS E AUTENTICAÇÃO ADMINISTRATIVA (Django Auth)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "auth_user" (
    "id" SERIAL PRIMARY KEY,
    "password" VARCHAR(128) NOT NULL,
    "last_login" TIMESTAMP WITH TIME ZONE,
    "is_superuser" BOOLEAN NOT NULL,
    "username" VARCHAR(150) NOT NULL UNIQUE,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "date_joined" TIMESTAMP WITH TIME ZONE NOT NULL
);
