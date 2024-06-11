import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Usuários - SignIn', () => {

  beforeAll(async () => {
    await testServer.post('/cadastrar').send({
      nome: 'Everlon',
      email: 'everlon@gmail.com',
      senha: '12345678',
    });

  });

  it('Faz login', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        email: 'everlon@gmail.com',
        senha: '12345678',
      });
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty('accessToken');
  });

  it('Senha errada', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        email: 'everlon@gmail.com',
        senha: '1234569',
      });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Email errado', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        senha: '12345678',
        email: 'everlonpassos@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Formato de email inválido', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        senha: '123456',
        email: 'everlon gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });

  it('Senha muito pequena', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        senha: '12',
        email: 'everlon@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });

  it('Não informado a senha', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        email: 'everlon@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });

  it('Não informado email', async () => {
    const res1 = await testServer
      .post('/acesso')
      .send({
        senha: '123456',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });

});
