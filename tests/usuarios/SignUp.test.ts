import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Usuário - SignUp', () => {

  it('Cadastra primeiro usuário', async () => {
    const res1 = await testServer.post('/cadastrar').send({ nome: 'Everlon Passos', email: 'everlon@gmail.com', senha: '1234567' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Cadastra usuário 2', async () => {
    const res1 = await testServer.post('/cadastrar').send({senha: '1234568', nome: 'Peterson José', email: 'peterson@gmail.com' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Erro ao cadastrar um usuário com email duplicado', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '1234567',
        nome: 'Peterson José',
        email: 'petersonjose@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/cadastrar')
      .send({
        senha: '1234567',
        nome: 'Peterson José',
        email: 'petersonjose@gmail.com',
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });

  it('Erro ao cadastrar um usuário sem email', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Robson José',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });

  it('Erro ao cadastrar um usuário sem nome', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        email: 'rbson@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

  it('Erro ao cadastrar um usuário sem senha', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Robson José',
        email: 'rbson@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });

  it('Erro ao cadastrar um usuário com email inválido', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Robson José',
        email: 'rbson gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });

  it('Erro ao cadastrar um usuário com senha muito pequena', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123',
        nome: 'Robson José',
        email: 'rbson@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });

  it('Erro ao cadastrar um usuário com nome muito pequeno', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'RJ',
        email: 'rbson@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

});
