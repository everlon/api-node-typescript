import { ETableNames } from '../../ETableNames';
import { IModelo } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IModelo[] | Error> => {

  try {
    const result = await Knex(ETableNames.modelo)
      .select('*')
      .where('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {

    console.log(error);
    return new Error('Erro ao consultar os registros');
  }

};
