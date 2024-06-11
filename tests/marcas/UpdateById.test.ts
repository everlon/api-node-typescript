import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Marcas - UpdateById', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'create-marcas@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/acesso').send({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta atualizar sem token', async () => {

      const res1 = await testServer.put('/marca/1').send({ nome: 'Teste' });

      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res1.body).toHaveProperty('errors.default');
    });

  it('Atualiza registro', async () => {

    const res1 = await testServer.post('/marca')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Chevrolet' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/marca/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Audi' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer.put('/marca/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Audi' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});
