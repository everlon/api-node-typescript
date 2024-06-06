import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Marcas - GetById', () => {

  it('Busca registro por id', async () => {

    const res1 = await testServer.post('/marca').send({ nome: 'Effa' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/marca/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');
  });

  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer.get('/marca/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
