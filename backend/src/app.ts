import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './database/db';
import rotasTarefas from './routes/rotasTarefa'

const app = express();

app.use(express.json());
app.options('*', cors());
app.use(cors({
    origin: 'https://gerenciadortarefasmcs.netlify.app/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));


app.use(cookieParser());

app.use(rotasTarefas);

export default app;