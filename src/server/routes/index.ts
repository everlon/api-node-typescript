import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MarcasController } from '../controllers/marcas';


const router = Router();


router.get('/', (_, res) => {
		return res.send('Hello World!');
});

router.post('/marcas', MarcasController.create);




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
