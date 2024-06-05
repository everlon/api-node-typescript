"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
require("dotenv/config");
var server = (0, express_1.default)();
exports.server = server;
server.use(express_1.default.json());
server.use(routes_1.router);
