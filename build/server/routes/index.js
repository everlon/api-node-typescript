"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../shared/middlewares");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (_, res) => {
    return res.send('Hello World!');
});
router.get('/marcas', middlewares_1.ensureAuthenticated, controllers_1.MarcasController.getAllValidation, controllers_1.MarcasController.getAll);
router.post('/marca', middlewares_1.ensureAuthenticated, controllers_1.MarcasController.createValidation, controllers_1.MarcasController.create);
router.get('/marca/:id', middlewares_1.ensureAuthenticated, controllers_1.MarcasController.getByIdValidation, controllers_1.MarcasController.getById);
router.put('/marca/:id', middlewares_1.ensureAuthenticated, controllers_1.MarcasController.updateByIdValidation, controllers_1.MarcasController.updateById);
router.delete('/marca/:id', middlewares_1.ensureAuthenticated, controllers_1.MarcasController.deleteByIdValidation, controllers_1.MarcasController.deleteById);
router.get('/modelos', middlewares_1.ensureAuthenticated, controllers_1.ModelosController.getAllValidation, controllers_1.ModelosController.getAll);
router.post('/modelo', middlewares_1.ensureAuthenticated, controllers_1.ModelosController.createValidation, controllers_1.ModelosController.create);
router.get('/modelo/:id', middlewares_1.ensureAuthenticated, controllers_1.ModelosController.getByIdValidation, controllers_1.ModelosController.getById);
router.put('/modelo/:id', middlewares_1.ensureAuthenticated, controllers_1.ModelosController.updateByIdValidation, controllers_1.ModelosController.updateById);
router.delete('/modelo/:id', middlewares_1.ensureAuthenticated, controllers_1.ModelosController.deleteByIdValidation, controllers_1.ModelosController.deleteById);
router.post('/acesso', controllers_1.UsuariosController.signInValidation, controllers_1.UsuariosController.signIn);
router.post('/cadastrar', controllers_1.UsuariosController.signUpValidation, controllers_1.UsuariosController.signUp);
router.post('/:id', (req, res) => {
    const concatenatedData = Object.assign(Object.assign({}, req.params), req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(concatenatedData);
});
