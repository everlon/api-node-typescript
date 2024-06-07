import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Modelos - Create', () => {
  let marcaId: number | undefined = undefined;

  beforeAll(async () => {
    const resMarca = await testServer.post('/marca').send({ nome: 'Ford' });

    marcaId = resMarca.body;
  });


  it('Cria registro', async () => {

    const res1 = await testServer.post('/modelo').send({ marcaId, ano: 2022, nome: 'Corolla', });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('Cadastra registro 2', async () => {

    const res1 = await testServer.post('/modelo').send({ marcaId, nome: 'Camry', ano: 2021, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('Tenta criar registro com nome muito curto', async () => {

    const res1 = await testServer.post('/modelo').send({ marcaId, ano: 2021, nome: 'HR', });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');

  });

  it('Tenta criar registro sem nome', async () => {

    const res1 = await testServer.post('/modelo').send({marcaId, ano: 2022, });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');

  });

  it('Tenta criar registro sem ano', async () => {

    const res1 = await testServer.post('/modelo').send({ marcaId, nome: 'C-HR', });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.ano');

  });

  it('Tenta criar registro sem marcaId', async () => {

    const res1 = await testServer.post('/modelo').send({ ano: 2020, nome: 'Avalon', });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.marcaId');

  });

  it('Tenta criar registro com marcaId inválido', async () => {

    const res1 = await testServer.post('/modelo').send({ marcaId: 'teste', ano: 2020, nome: 'Avalon', });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.marcaId');

  });

  it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

    const res1 = await testServer.post('/modelo').send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.ano');
    expect(res1.body).toHaveProperty('errors.body.marcaId');
    expect(res1.body).toHaveProperty('errors.body.nome');

  });

});
