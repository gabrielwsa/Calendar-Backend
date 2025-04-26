# API de Calendário

Esta é uma API backend para um aplicativo de calendário, construída com Node.js, Express e MongoDB.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- bcryptjs (para criptografia de senhas)
- CORS

## Instalação

Para instalar o projeto, siga as instruções abaixo:

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Entrar na pasta do projeto
cd Calendar-Backend

# Instalar dependências
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto baseado no arquivo `.env.template`
2. Configure as seguintes variáveis de ambiente:

```
# URL de conexão com o MongoDB
DB_URL=

# Porta onde o servidor vai rodar
PORT=

# Chave secreta para JWT
SECRET_JWT_SEED=
```

## Comandos disponíveis

```bash
# Iniciar o servidor em modo de desenvolvimento (com nodemon)
npm run dev

# Iniciar o servidor em modo de produção
npm start
```

## Estrutura da API

### Autenticação
- `POST /api/auth/new`: Criar um novo usuário
  - Campos obrigatórios: name, email, password
- `POST /api/auth`: Login de usuário
  - Campos obrigatórios: email, password
- `GET /api/auth/renew`: Renovar token JWT (requer JWT válido)

### Eventos
- `GET /api/events`: Obter todos os eventos (requer JWT)
- `POST /api/events`: Criar um novo evento (requer JWT)
  - Campos obrigatórios: title, start, end
  - Campos opcionais: notes
- `PUT /api/events/:id`: Atualizar um evento existente (requer JWT)
- `DELETE /api/events/:id`: Excluir um evento (requer JWT)

## Segurança

Todos os endpoints de eventos são protegidos por autenticação JWT. É necessário enviar um token válido no cabeçalho da requisição para acessá-los.

## Desenvolvimento

Este projeto utiliza MongoDB Atlas como banco de dados na nuvem. Certifique-se de atualizar a variável `DB_URL` no arquivo `.env` caso queira usar uma instância diferente. 