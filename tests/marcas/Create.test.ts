import { StatusCodes, getStatusCode } from "http-status-codes";
import { testServer } from "../jest.setup"


describe('Marcas - Create', () => {

  it('Criar registro', async () => {
    const res1 = await testServer.post('/marcas').send({
      nome: 'BMW'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Não pode criar registro com nome muito curto', async () => {
    const res1 = await testServer.post('/marcas').send({
      nome: 'BM'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

});
