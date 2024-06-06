import { Request, RequestHandler, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares/Validation";


interface IMarcas {
  nome: string;
}
interface IFilter {
  filter?: string;
}

// Middleware
export const createValidation = validation((getSchema) => ({
  body: getSchema<IMarcas>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().min(3).optional(),
  })),
}));


// Controller
export const create = async (req: Request<{}, {}, IMarcas>, res: Response) => {
  console.log(req.body);

  return res.send('Marcas: Create!');
}
