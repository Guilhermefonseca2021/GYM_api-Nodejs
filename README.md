

## Ferramentas

- [] [Typescrupt]()
- [] [Nodejs]()
- [] [Docker]()
- [] [Postgresql]()

## Setup Prisma


migrations always
```js
$ npx prisma migrate dev
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