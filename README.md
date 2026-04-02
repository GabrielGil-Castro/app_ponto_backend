# Ponto App — Backend

API REST para registro de ponto eletrônico com autenticação JWT, controle de perfis (admin/funcionário) e deploy em produção via Railway.

🌐 **Deploy:** Railway  
💻 **Frontend:** [app-ponto-frontend.vercel.app](https://app-ponto-frontend.vercel.app)

> **Repositório frontend:** [app_ponto_frontend](https://github.com/GabrielGil-Castro/app_ponto_frontend)

---

## Funcionalidades

- Autenticação com JWT
- Registro de ponto eletrônico com um clique
- Histórico de registros por funcionário
- Painel administrativo com CRUD de usuários
- Proteção de rotas por perfil (admin/employee)
- Admin não pode ser excluído do sistema
- Deploy containerizado com Docker

---

## Stack

| Tecnologia | Uso |
|---|---|
| Node.js 23 + Express v5 | Runtime e framework HTTP |
| Sequelize v6 + MySQL 8 | ORM + banco de dados |
| JWT (jsonwebtoken) | Autenticação |
| bcryptjs | Hash de senhas |
| Docker + Docker Compose | Containerização |

---

## Como rodar localmente

**Pré-requisitos:** Node.js 23+, Docker

```bash
# 1. Clonar o repositório
git clone https://github.com/GabrielGil-Castro/app_ponto_backend.git
cd app_ponto_backend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
# Criar .env.development na raiz com o conteúdo abaixo

# 4. Rodar seeds (usuários padrão)
npx sequelize-cli db:seed:all

# 5. Iniciar servidor
npm run dev
# Disponível em http://localhost:3001
```

### Variáveis de ambiente

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ponto_db
DB_USER=root
DB_PASS=sua-senha
JWT_SECRET=seu-secret-local
PORT=3001
NODE_ENV=development
```

### Rodando com Docker

```bash
# Na raiz do monorepo (sobe MySQL + backend + frontend)
docker compose up
```

---

## Usuários padrão (Seeds)

| Email | Senha | Perfil |
|---|---|---|
| admin@ponto.com | admin123 | admin |
| funcionario@ponto.com | func123 | employee |

> ⚠️ Troque as senhas antes de qualquer deploy em produção.

---

## Endpoints

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/health` | Pública | Health check |
| POST | `/auth/login` | Pública | Login — retorna JWT |
| POST | `/punch` | Autenticado | Registrar ponto |
| GET | `/punch/my` | Autenticado | Meus registros (últimos 20) |
| GET | `/admin/users` | Admin | Listar usuários |
| POST | `/admin/users` | Admin | Criar usuário |
| DELETE | `/admin/users/:id` | Admin | Excluir usuário |
| GET | `/admin/records` | Admin | Todos os registros (últimos 50) |
| DELETE | `/admin/records/:id` | Admin | Excluir registro |

Autenticação via header:
```
Authorization: Bearer <token>
```

---

## Estrutura

```
src/
├── config/
│   └── database.js         # Conexão Sequelize
├── controllers/
│   ├── authController.js   # Login JWT
│   ├── punchController.js  # Registrar ponto / histórico
│   └── adminController.js  # CRUD usuários e registros
├── middlewares/
│   └── auth.js             # authenticate + authorizeAdmin
├── models/
│   ├── User.js
│   ├── PunchRecord.js
│   └── index.js            # Associações
├── routes/
│   ├── auth.js
│   ├── punch.js
│   └── admin.js
└── server.js
```

---

## Deploy

Plataforma: **Railway**

Variáveis obrigatórias em produção:

| Variável | Descrição |
|---|---|
| `DB_HOST` | Host do MySQL (Railway) |
| `DB_PORT` | Porta do MySQL (3306) |
| `DB_NAME` | Nome do banco |
| `DB_USER` | Usuário do banco |
| `DB_PASS` | Senha forte |
| `JWT_SECRET` | String de 64+ caracteres |
| `PORT` | 3001 |
| `NODE_ENV` | production |

---

## Decisões técnicas

- **Express v5** — propagação automática de erros async sem try/catch em todos os handlers
- **Sequelize com `sync({ alter: true })`** em dev — usar migrations explícitas em produção
- **bcryptjs** (puro JS) — sem dependências nativas, compatível com Docker Alpine
- **JWT 8h sem refresh token** — adequado para o escopo atual
- **Docker multi-stage** — build com Node, serve com Nginx; imagem final enxuta
