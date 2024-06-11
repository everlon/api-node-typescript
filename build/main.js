"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../src/server/database/knex");
const Server_1 = require("./server/Server");
const startServer = () => {
    Server_1.server.listen(process.env.PORT || 3333, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3333}`);
    });
};
if (process.env.IS_LOCALHOST !== 'true') {
    console.log('Rodando Migrations e Seeds');
    knex_1.Knex.migrate.latest().then(() => {
        knex_1.Knex.seed.run().then(() => startServer()).catch(console.log);
    }).catch(console.log);
}
else {
    startServer();
}
