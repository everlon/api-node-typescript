import { Knex } from '../src/server/database/knex';
import { server } from './server/Server';


const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3333}`);
  });
};


if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Rodando Migrations e Seeds');

  Knex.migrate.latest().then(() => {
      Knex.seed.run().then(() => startServer()).catch(console.log);
    }).catch(console.log);
} else {
  startServer();
}
