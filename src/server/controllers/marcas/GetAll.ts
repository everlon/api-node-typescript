import { Request, RequestHandler, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";


interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

// Middleware
export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().moreThan(0).optional(),
    limit: yup.number().moreThan(0).optional(),
    filter: yup.string().optional(),
  })),
}));


// Controller
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  console.log(req.query);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Marcas: getAll!');
}
