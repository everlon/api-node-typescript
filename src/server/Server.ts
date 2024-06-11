import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { router } from './routes';
import './shared/services/TranslationYup';


const server = express();

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));

server.use(express.json());
server.use(router);

export { server };
