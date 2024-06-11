import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - UpdateById', () => {

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


  it('Tenta atualizar sem token', async () => {
    const res1 = await testServer
      .put('/modelo/1')
      .send({ marcaId, nome: 'Expedition', ano: 2023, });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Atualiza registro', async () => {
    const res1 = await testServer.post('/modelo')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ marcaId, nome: 'Expedition', ano: 2023, });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/modelo/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ marcaId, nome: 'Expedition', ano: 2023, });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {
    const res1 = await testServer.put('/modelo/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ marcaId, ano: 2023, nome: 'Expedition', });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
