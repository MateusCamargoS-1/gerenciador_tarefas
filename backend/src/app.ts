import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import './database/db';
import rotasTarefas from './routes/rotasTarefa'

const app = express();
const csrfProtection = csurf({cookie: true});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(csrfProtection);

app.use(rotasTarefas);

export default app;