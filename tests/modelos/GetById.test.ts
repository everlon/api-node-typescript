import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - GetById', () => {

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
    const res1 = await testServer.get('/modelo/1').send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Busca registro por id', async () => {

    const res1 = await testServer.post('/modelo')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({marcaId: marcaId, nome: 'Explorer', ano: 2021, });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/modelo/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');

  });
  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer.get('/modelo/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
