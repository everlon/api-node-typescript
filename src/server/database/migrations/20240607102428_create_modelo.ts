import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {

  return knex
    .schema
    .createTable(ETableNames.modelo, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').index().notNullable();
      table.integer('ano').notNullable();

      table
        .bigInteger('marcaId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.marca)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar modelos das marcas no sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.modelo}`);
    });

}

export async function down(knex: Knex) {

  return knex
    .schema
    .dropTable(ETableNames.modelo)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.modelo}`);
    });
}
