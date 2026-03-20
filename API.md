# API — Plataforma de Ponto

Base URL: `http://localhost:3001`

---

## Autenticação

As rotas protegidas exigem um token JWT no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

O token é obtido na rota de login e expira em **8 horas**.

---

## Rotas

### Auth

#### `POST /auth/login`
Autentica o usuário e retorna um token JWT.

**Autenticação:** Não requerida

**Body:**
```json
{
  "email": "admin@ponto.com",
  "password": "admin123"
}
```

**Resposta 200:**
```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@ponto.com",
    "role": "admin"
  }
}
```

**Erros:**
| Status | Mensagem |
|--------|----------|
| 400 | Email e senha sao obrigatorios. |
| 401 | Credenciais invalidas. |

---

### Ponto

#### `POST /punch`
Registra um ponto para o usuário autenticado.

**Autenticação:** Requerida (employee ou admin)

**Body:** Não requerido

**Resposta 201:**
```json
{
  "id": 1,
  "userId": 1,
  "punchedAt": "2026-03-20T13:13:01.001Z"
}
```

---

#### `GET /punch/my`
Lista os últimos 20 registros de ponto do usuário autenticado.

**Autenticação:** Requerida (employee ou admin)

**Resposta 200:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "punchedAt": "2026-03-20T13:13:01.000Z"
  }
]
```

---

### Admin

> Todas as rotas abaixo exigem autenticação com perfil `admin`.

#### `GET /admin/users`
Lista todos os usuários cadastrados.

**Autenticação:** Requerida (admin only)

**Resposta 200:**
```json
[
  {
    "id": 1,
    "name": "Administrador",
    "email": "admin@ponto.com",
    "role": "admin",
    "createdAt": "2026-03-18T17:45:03.000Z"
  }
]
```

---

#### `POST /admin/users`
Cria um novo usuário.

**Autenticação:** Requerida (admin only)

**Body:**
```json
{
  "name": "Funcionario Teste",
  "email": "funcionario@ponto.com",
  "password": "123456",
  "role": "employee"
}
```

> `role` é opcional — padrão: `employee`. Valores aceitos: `employee`, `admin`.

**Resposta 201:**
```json
{
  "id": 2,
  "name": "Funcionario Teste",
  "email": "funcionario@ponto.com",
  "role": "employee"
}
```

**Erros:**
| Status | Mensagem |
|--------|----------|
| 400 | Nome, email e senha sao obrigatorios. |
| 409 | Email ja cadastrado. |

---

#### `GET /admin/records`
Lista os últimos 50 registros de ponto de todos os usuários.

**Autenticação:** Requerida (admin only)

**Resposta 200:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "punchedAt": "2026-03-20T13:13:01.000Z",
    "User": {
      "id": 1,
      "name": "Administrador",
      "email": "admin@ponto.com"
    }
  }
]
```

---

## Erros Globais

| Status | Situação |
|--------|----------|
| 401 | Token não fornecido ou inválido |
| 403 | Rota restrita a administradores |

---

## Usuário padrão (seed)

| Campo | Valor |
|-------|-------|
| Email | admin@ponto.com |
| Senha | admin123 |
| Role  | admin |