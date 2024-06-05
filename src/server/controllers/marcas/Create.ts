import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';


interface IMarcas {
  nome: string;
}

const bodyValidation: yup.Schema<IMarcas> = yup.object().shape({
  nome: yup.string().required().min(3),
})


// Middleware
export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false});
    return next(); // Envia para a próxima

  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    })

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors })
  }
}


// Controller
export const create = async (req: Request<{}, {}, IMarcas>, res: Response) => {

  console.log(req.body.nome);

  return res.send('Marcas: Create!');
}
