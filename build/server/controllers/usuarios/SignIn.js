"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signInValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const usuarios_1 = require("../../database/providers/usuarios");
const middlewares_1 = require("../../shared/middlewares");
const services_1 = require("../../shared/services");
exports.signInValidation = (0, middlewares_1.validation)((getSchema) => ({
    body: getSchema(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6),
    })),
}));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    const usuario = yield usuarios_1.UsuariosProvider.getByEmail(email);
    if (usuario instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }
    const passwordMatch = yield services_1.PasswordCrypto.verifyPassword(senha, usuario.senha);
    if (!passwordMatch) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }
    else {
        const accessToken = services_1.JWTService.sign({ uid: usuario.id });
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso'
                }
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ accessToken });
    }
});
exports.signIn = signIn;
