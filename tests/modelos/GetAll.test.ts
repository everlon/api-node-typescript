import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - GetAll', () => {

  let marcaId: number | undefined = undefined;

  beforeAll(async () => {
    const resModelo = await testServer.post('/marca').send({ nome: 'Ford' });

    marcaId = resModelo.body;
  });


  it('Busca registros', async () => {

    const res1 = await testServer.post('/modelo').send({ marcaId, ano: 2021, nome: 'Maverick', });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/modelos').send();
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });

});
