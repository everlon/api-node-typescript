import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { MarcasProvider } from "../../database/providers/marcas";


interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}


export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().default(0),
    page: yup.number().moreThan(0).optional(),
    limit: yup.number().moreThan(0).optional(),
    filter: yup.string().optional(),
  })),
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const result = await MarcasProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id));
    const count = await MarcasProvider.count(req.query.filter);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message }
      });
    } else if (count instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: count.message }
      });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);

}
