import express from 'express';
import csurf from 'csurf';
import { atualizarTarefa, criarTarefa, deletarTarefa, pegarToken, todasTarefas } from '../controllers/controleTarefas';
import { validarDadosTarefa, verificarTituloUnico } from '../middleware/validarDadosTarefa';

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.get('/csrf-token', csrfProtection, pegarToken);

router.get('/tarefas', todasTarefas);

router.post('/tarefa', csrfProtection, validarDadosTarefa, verificarTituloUnico, criarTarefa);

router.put('/tarefa/:id', csrfProtection, validarDadosTarefa, verificarTituloUnico, atualizarTarefa);

router.delete('/tarefa/:id', csrfProtection, deletarTarefa);

export default router;