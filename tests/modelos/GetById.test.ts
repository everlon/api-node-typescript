import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - GetById', () => {
  let marcaId: number | undefined = undefined;

  beforeAll(async () => {
    const resModelo = await testServer.post('/marca').send({ nome: 'Ford' });

    marcaId = resModelo.body;
  });


  it('Busca registro por id', async () => {

    const res1 = await testServer.post('/modelo').send({marcaId: marcaId, nome: 'Explorer', ano: 2021, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/modelo/${res1.body}`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');

  });
  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer.get('/modelo/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
