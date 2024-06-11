import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - GetAll', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'create-modelos@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/acesso').send({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });


  let marcaId: number | undefined = undefined;

  beforeAll(async () => {
    const resModelo = await testServer.post('/marca')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Ford' });

    marcaId = resModelo.body;
  });


  it('Tenta consultar sem token', async () => {
    const res1 = await testServer.get('/modelos').send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Busca registros', async () => {
    const res1 = await testServer.post('/modelo')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ marcaId, ano: 2021, nome: 'Maverick', });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/modelos')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });

});
