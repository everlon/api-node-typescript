import { ETableNames } from '../../ETableNames';
import { IMarca } from '../../models';
import { Knex } from '../../knex';


export const create = async (marca: Omit<IMarca, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.marca).insert(marca).returning('id');

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
