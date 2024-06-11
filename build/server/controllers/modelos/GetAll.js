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
exports.getAll = exports.getAllValidation = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const Validation_1 = require("../../shared/middlewares/Validation");
const modelos_1 = require("./../../database/providers/modelos");
exports.getAllValidation = (0, Validation_1.validation)(get => ({
    query: get(yup.object().shape({
        page: yup.number().integer().optional().moreThan(0).default(1),
        limit: yup.number().integer().optional().moreThan(0).default(10),
        filter: yup.string().optional().default(''),
    })),
}));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modelos_1.ModelosProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '');
    const count = yield modelos_1.ModelosProvider.count(req.query.filter);
    if (result instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    }
    else if (count instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
exports.getAll = getAll;
