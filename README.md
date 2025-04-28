# API de Calendário

Esta é uma API backend para um aplicativo de calendário, construída com Node.js, Express e MongoDB. A API oferece funcionalidades de autenticação de usuários e gerenciamento de eventos com mecanismos de segurança.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express 4.19** - Framework web
- **MongoDB** (Mongoose 8.13) - Banco de dados NoSQL
- **JWT** (JSON Web Token) - Para autenticação e autorização
- **bcryptjs** - Para criptografia de senhas
- **express-validator** - Para validação de dados
- **CORS** - Para permitir requisições de diferentes origens
- **dotenv** - Para gerenciamento de variáveis de ambiente

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

# Chave secreta para JWT (importante para segurança)
SECRET_JWT_SEED=
```

## Comandos disponíveis

```bash
# Iniciar o servidor em modo de desenvolvimento (com nodemon)
npm run dev

# Iniciar o servidor em modo de produção
npm start
```

## Estrutura do Projeto

```
Calendar-Backend/
├── controllers/       # Controladores da aplicação
├── database/          # Configuração do banco de dados
├── helpers/           # Funções auxiliares (JWT, validação de data)
├── middlewares/       # Middlewares (validação JWT, campos)
├── models/            # Modelos de dados (User, Events)
├── public/            # Arquivos estáticos
│   └── assets/        # Recursos para frontend
├── routes/            # Rotas da API
└── index.js           # Ponto de entrada da aplicação
```

## Modelos de Dados

### Usuário (User)
- **name**: Nome do usuário
- **email**: Email do usuário (único)
- **password**: Senha criptografada do usuário

### Evento (Event)
- **title**: Título do evento
- **start**: Data de início
- **end**: Data de término
- **notes**: Anotações do evento (opcional)
- **user**: Referência ao usuário que criou o evento

## Rotas da API

### Autenticação (/api/auth)
- `POST /api/auth/new`: Criar um novo usuário
  - Campos obrigatórios: name, email, password
  - Retorna: uid, name, token JWT
- `POST /api/auth`: Login de usuário
  - Campos obrigatórios: email, password
  - Retorna: uid, name, token JWT
- `GET /api/auth/renew`: Renovar token JWT (requer token JWT válido)
  - Retorna: uid, name, novo token JWT

### Eventos (/api/events)
- `GET /api/events`: Obter todos os eventos (requer JWT)
  - Retorna: lista de eventos com informações do usuário associado
- `POST /api/events`: Criar um novo evento (requer JWT)
  - Campos obrigatórios: title, start, end
  - Campos opcionais: notes
  - Retorna: dados do evento criado
- `PUT /api/events/:id`: Atualizar um evento existente (requer JWT)
  - Importante: Só permite que o criador do evento faça a atualização
- `DELETE /api/events/:id`: Excluir um evento (requer JWT)
  - Importante: Só permite que o criador do evento faça a exclusão

## Segurança

- Todos os endpoints de eventos são protegidos por autenticação JWT
- Tokens JWT expiram em 2 horas
- O sistema implementa mecanismo de bloqueio que impede usuários de editarem eventos que não criaram
- As senhas são armazenadas com criptografia bcrypt

## Desenvolvimento

- Este projeto utiliza MongoDB como banco de dados. Por padrão, está configurado para se conectar ao MongoDB Atlas (cloud)
- A aplicação usa o modo SPA (Single Page Application) e serve arquivos estáticos da pasta "public"
- Todas as requisições não encontradas nas rotas da API são redirecionadas para o frontend
- Erros de validação são tratados de forma centralizada através de middlewares 