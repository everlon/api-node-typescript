import { StatusCodes, getStatusCode } from "http-status-codes";
import { testServer } from "../jest.setup"


describe('Marcas - Create', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'create-marcas@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/acesso').send({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });

  it('Tenta criar um registro sem token', async () => {
      const res1 = await testServer.post('/marca')
        .send({ nome: 'BMW' });

      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res1.body).toHaveProperty('errors.default');
    });

  it('Criar registro', async () => {
    const res1 = await testServer.post('/marca')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'BMW' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Não pode criar registro com nome muito curto', async () => {
    const res1 = await testServer.post('/marca')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'BM' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

});
