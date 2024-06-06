import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { IMarca } from "../../database/models";
import { MarcasProvider } from "../../database/providers/marcas";


interface IBodyProps extends Omit<IMarca, 'id'> { }


export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
}));


export const create = async (req: Request<{}, {}, IMarca>, res: Response) => {
  const result = await MarcasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
