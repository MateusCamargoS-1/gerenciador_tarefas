import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './database/db';
import rotasTarefas from './routes/rotasTarefa'

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(cookieParser());

app.use(rotasTarefas);

export default app;