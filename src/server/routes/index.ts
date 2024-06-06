import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MarcasController } from '../controllers/marcas';


const router = Router();


router.get('/', (_, res) => {
		return res.send('Hello World!');
});

router.get('/marcas', MarcasController.getAllValidation, MarcasController.getAll);
router.post('/marcas', MarcasController.createValidation, MarcasController.create);
router.get('/marca/:id', MarcasController.getByIdValidation, MarcasController.getById);
router.put('/marca/:id', MarcasController.updateByIdValidation, MarcasController.updateById);
router.delete('/marca/:id', MarcasController.deleteByIdValidation, MarcasController.deleteById);



// Testes...
router.post('/:id', (req, res) => {
    // console.log(req.body)

    // Aqui estou enviando um json e pegando também o parâmetro ID.
    // {
    //     "teste": "test",
    //     "testando ": {
    //         "testando": "testando..."
    //     }
    // }
    // Com isso quero concatenar os dois para retornar.
    const concatenatedData = { ...req.params, ...req.body };

    return res.status(StatusCodes.OK).json(concatenatedData);
});



export { router };
