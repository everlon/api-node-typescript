import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - UpdateById', () => {

  let marcaId: number | undefined = undefined;

  beforeAll(async () => {
    const resModelo = await testServer.post('/marca').send({ nome: 'Ford' });

    marcaId = resModelo.body;
  });

  it('Atualiza registro', async () => {
    const res1 = await testServer.post('/modelo').send({ marcaId, nome: 'Expedition', ano: 2023, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/modelo/${res1.body}`).send({ marcaId, nome: 'Expedition', ano: 2023, });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {
    const res1 = await testServer.put('/modelo/99999').send({ marcaId, ano: 2023, nome: 'Expedition', });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
