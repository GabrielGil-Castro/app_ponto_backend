# Ponto App — Backend

API REST para sistema de registro de ponto. Desenvolvido com Node.js, Express e MySQL.

## Stack

- Node.js + Express v5
- Sequelize v6 + MySQL
- JWT + bcrypt
- Docker

## Funcionalidades

- Autenticação com JWT
- Perfis: `admin` e `employee`
- Registro de ponto com timestamp
- Painel admin: gerenciar usuários e registros

## Como rodar localmente

### Pré-requisitos
- Node.js 23+
- Docker Desktop

### Setup
```bash
# instalar dependências
npm install

# subir o banco
docker compose up -d db

# rodar em desenvolvimento
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ponto_dev
DB_USER=root
DB_PASS=root
JWT_SECRET=dev_secret
PORT=3001
NODE_ENV=development
```

### Seeds
```bash
npx sequelize-cli db:seed:all
```

Cria os usuários padrão:
| Email | Senha | Perfil |
|-------|-------|--------|
| admin@ponto.com | admin123 | admin |
| funcionario@ponto.com | func123 | employee |

## Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | /auth/login | Pública | Login |
| POST | /punch | Employee/Admin | Bater ponto |
| GET | /punch/my | Employee/Admin | Meus registros |
| GET | /admin/users | Admin | Listar usuários |
| POST | /admin/users | Admin | Criar usuário |
| DELETE | /admin/users/:id | Admin | Excluir usuário |
| GET | /admin/records | Admin | Todos os registros |
| DELETE | /admin/records/:id | Admin | Excluir registro |

## Rodar em produção
```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up --build
```
