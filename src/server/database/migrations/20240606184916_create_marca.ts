import type { Knex } from "knex";
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.marca, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).checkLength('<=', 150).index().notNullable();
      table.comment('Tabela usada para armazenar marcas do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.marca}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.marca)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.marca}`);
    });
}
