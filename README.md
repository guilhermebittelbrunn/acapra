# Pagamentos10



## Resumo do Projeto



## Desenvolvimento

### Dependências

- **Docker**: Consulte a [documentação oficial](https://www.docker.com/) para instalação.
- **pnpm**: Gerenciador de pacotes. Consulte a [documentação oficial](https://pnpm.io/) para instalação.
- **@nestjs/cli**: Recomendado para agilizar o desenvolvimento,
  Consulte a [documentação](https://docs.nestjs.com/) para mais detalhes:
  ```sh
  npm install -g @nestjs/cli
  ```

## Rodando Localmente

Clone o repositório:

```sh
git clone https://github.com/pedidos10/pagamentos10.git
cd pagamentos10
```

Instale as dependências:

```sh
pnpm install
```

Copie o arquivo \`.env.example\` para \`.env\` e configure as variáveis de ambiente.

Suba o banco de dados local:

```sh
pnpm up:db
```

Execute as migrations e seeds:

```sh
pnpm migration:run
pnpm seed:run
```

Inicie a aplicação em modo de desenvolvimento:

```sh
pnpm dev
```

_Se, por alguma razão, você receber uma mensagem de erro dizendo algo como "@prisma/client was not initialized" ou "@prisma/client has not exported member" rode o comando `pnpm prisma:generate` ou `pnpm generate`_

## Testes

### Executar testes unitários

```sh
pnpm test
```

### Executar testes e2e

```sh
pnpm test:e2e
```

## Documentação da API

A API está documentada via **Swagger**. Após iniciar o servidor, acesse:

[http://localhost:4000/api](http://localhost:4000/api)

## Banco de dados

Com o servidor ativo em **modo dev** é possível visualizar os schemas e os registros do banco local através do [prisma studio](https://www.prisma.io/docs/orm/tools/prisma-studio), acesse:

[http://localhost:5555](http://localhost:5555)

## Deploy

A aplicação está configurada para deploy via **GitHub Actions**, sendo distribuído em container **Docker** na **AWS**,

## Referências

- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [Zoop API](https://docs.zoop.co/reference/introducao)
- [Docker](https://www.docker.com/)
