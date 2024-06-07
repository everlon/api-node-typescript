import { ETableNames } from '../../ETableNames';
import { IModelo } from '../../models';
import { Knex } from '../../knex';


export const create = async (modelo: Omit<IModelo, 'id'>): Promise<number | Error> => {

  try {
    const [{ count }] = await Knex(ETableNames.marca)
      .where('id', '=', modelo.marcaId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A marca usada no cadastro não foi encontrada');
    }

    const [result] = await Knex(ETableNames.modelo).insert(modelo).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {

    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }

};
