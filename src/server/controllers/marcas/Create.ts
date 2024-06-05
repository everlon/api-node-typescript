import { Request, Response } from "express";
import * as yup from 'yup';


interface IMarcas {
  nome: string;
}

const bodyValidation: yup.Schema<IMarcas> = yup.object().shape({
  nome: yup.string().required().min(3),
})

export const create = async (req: Request<{}, {}, IMarcas>, res: Response) => {

  let validatedData: IMarcas | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      }
    })
  }

  console.log(req.body.nome);

  return res.send('Marcas: Create!');
}
