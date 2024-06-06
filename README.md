# API REST, Node e Typescript

## RUNNING

Para rodar o "server":
`npm exec ts-node-dev ./src/main.ts`

Depois de colocar a linha:
`"scripts": { "start": "ts-node-dev ./src/main.ts",`

Somente inicie o server com: `npm start`


## BUILDING

Criar o arquivo de configuração do TS

`npm exec tsc --init` (https://aka.ms/tsc)

<!-- Tive que gerar o arquivo na mão pois não criou com --init -->


## TESTING

Executar os testes com JEST:
`npm exec jest`


## MIGRATION

`npm exec knex -- --knexfile ./src/server/database/knex/Environment.ts migrate:make <nome_arquivo>`

Depois de incluir os scripts no package.json:

`"knex:rollback": "knex --knexfile ./src/server/database/knex/Environment.ts migrate:rollback",`
`"knex:migrate": "knex --knexfile ./src/server/database/knex/Environment.ts migrate:latest",`

Podemos rodar assim: `npm run knex:migrate` e `npm run knex:rollback`
