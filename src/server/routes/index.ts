import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MarcasController, ModelosController, UsuariosController } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares';


const router = Router();


router.get('/', (_, res) => {
		return res.send('Hello World!');
});

router.get('/marcas', ensureAuthenticated, MarcasController.getAllValidation, MarcasController.getAll);
router.post('/marca', ensureAuthenticated, MarcasController.createValidation, MarcasController.create);
router.get('/marca/:id', ensureAuthenticated, MarcasController.getByIdValidation, MarcasController.getById);
router.put('/marca/:id', ensureAuthenticated, MarcasController.updateByIdValidation, MarcasController.updateById);
router.delete('/marca/:id', ensureAuthenticated, MarcasController.deleteByIdValidation, MarcasController.deleteById);


router.get('/modelos', ensureAuthenticated, ModelosController.getAllValidation, ModelosController.getAll);
router.post('/modelo', ensureAuthenticated, ModelosController.createValidation, ModelosController.create);
router.get('/modelo/:id', ensureAuthenticated, ModelosController.getByIdValidation, ModelosController.getById);
router.put('/modelo/:id', ensureAuthenticated, ModelosController.updateByIdValidation, ModelosController.updateById);
router.delete('/modelo/:id', ensureAuthenticated, ModelosController.deleteByIdValidation, ModelosController.deleteById);


router.post('/acesso', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);


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
