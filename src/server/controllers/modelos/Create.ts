import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { ModelosProvider } from './../../database/providers/modelos';
import { validation } from '../../shared/middlewares/Validation';
import { IModelo } from './../../database/models';


interface IBodyProps extends Omit<IModelo, 'id'> { }


export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    marcaId: yup.number().integer().required(),
    nome: yup.string().required().min(3).max(150),
    ano: yup.number().integer().required(),
  })),
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await ModelosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);

};
