import { ETableNames } from '../../ETableNames';
import { IModelo } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, modelo: Omit<IModelo, 'id'>): Promise<void | Error> => {

  try {
    const [{ count }] = await Knex(ETableNames.marca)
      .where('id', '=', modelo.marcaId).count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A marca usada no cadastro não foi encontrada');
    }

    const result = await Knex(ETableNames.modelo).update(modelo).where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }

};
