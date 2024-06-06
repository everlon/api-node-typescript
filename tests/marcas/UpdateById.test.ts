import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Marcas - UpdateById', () => {

  it('Atualiza registro', async () => {

    const res1 = await testServer.post('/marcas').send({ nome: 'Chevrolet' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/marca/${res1.body}`).send({ nome: 'Audi' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer.put('/marca/99999').send({ nome: 'Audi' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
