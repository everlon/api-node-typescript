import { ETableNames } from '../../ETableNames';
import { IMarca } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IMarca[] | Error> => {

  try {
    const result = await Knex(ETableNames.marca).select('id', 'nome')
      .where('id', Number(id)).orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit).limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.marca).select('id', 'nome').where('id', '=', id).first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }

};
