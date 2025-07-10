## Gym system

Simple application that allows users to register, login, and manage their profiles. It is built using Node.js, TypeScript, and Prisma ORM for database management. The application follows the SOLID principles and uses the repository pattern to manage user data. The RegisterUseCase class is responsible for handling user registration logic, including password hashing and email uniqueness checks. The PrismaUsersRepository class implements the UsersRepository interface to interact with the database. The application uses Fastify for handling HTTP requests and Zod for request validation.

## Ferramentas

- [x] [Typescript]()
- [x] [Nodejs]()
- [x] [Docker]()
- [x] [Postgresql]()
- [x] [Prisma]()

## Setup Prisma


migrations sempre atualizadas para o banco de dados.

```js
$   npx prisma migrate dev
// pra testar meu banco:
$   npx prisma studio
// para rodar todas migratiosn no banco de dados:
$   npx prisma migrate deploy
```

## Setup Docker

Para facilitar e evitar conflitos em aplicacoes que originalmente so "na minha maquina funciona" e nao no servidor nem em outros.

```bash
# rodar a porta dentro do container para o host.
$   docker run --name api-solid -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_PASSWORD=admin -e POSTGRESQL_DATABASE=api_db -p 5432:5432 -d bitnami/postgresql
# listar do docker todos containers rodando e adicionar -a para listar todos criados
$   docker ps
# rodar container pelo id 
$   docker start [idname/]
# parar o container 
$   docker stop [id/name]
# remover o container do docker
$   docker rm [id/name]
```

### Porque usar docker compose?

um arquivo para setar todos containers, exemplo: tenho mais do que o banco postgresql na aplicacao, imagina ter que vir no readme seguir o manual para rodar toda aplicacao, mais facil agrupar tudo em um arquivo docker-compose.yml e setar na maquina de um comando so.

```bash
# arquivo prenchido para subir aplicacao para o docker so usar comando: -d roda em background sem os logs.
$   docker compose up -d
#  para parar containers:
$   docker compose stop
# para para de deletar todos containers:
$   docker compose down
```

## 