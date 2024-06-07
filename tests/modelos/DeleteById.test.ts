import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - DeleteById', () => {

  let marcaId: number | undefined = undefined;

  beforeAll(async () => {
    const resModelo = await testServer.post('/marca').send({ nome: 'Ford' });

    marcaId = resModelo.body;
  });


  it('Apaga registro', async () => {
    const res1 = await testServer.post('/modelo').send({ marcaId, nome: 'Mustang', ano: 2021, });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/modelo/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('Tenta apagar registro que não existe', async () => {
    const res1 = await testServer.delete('/modelo/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
