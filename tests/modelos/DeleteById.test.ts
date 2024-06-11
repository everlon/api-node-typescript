import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - DeleteById', () => {

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


  it('Tenta apagar registro sem token', async () => {
      const res1 = await testServer.delete('/modelo/1').send();

      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res1.body).toHaveProperty('errors.default');
    });

  it('Apaga registro', async () => {
    const res1 = await testServer.post('/modelo')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ marcaId, nome: 'Mustang', ano: 2021, });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/modelo/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('Tenta apagar registro que não existe', async () => {
    const res1 = await testServer.delete('/modelo/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
