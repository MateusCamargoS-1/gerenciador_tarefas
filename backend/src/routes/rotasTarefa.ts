import express from 'express';
import csurf from 'csurf';
import { atualizarTarefa, criarTarefa, deletarTarefa, pegarToken, todasTarefas } from '../controllers/controleTarefas';
import { validarDadosTarefa, verificarTituloUnico } from '../middleware/validarDadosTarefa';

const router = express.Router();

router.get('/csrf-token', pegarToken);

router.get('/tarefas', todasTarefas);

router.post('/tarefa', validarDadosTarefa, verificarTituloUnico, criarTarefa);

router.put('/tarefa/:id', validarDadosTarefa, verificarTituloUnico, atualizarTarefa);

router.delete('/tarefa/:id', deletarTarefa);

export default router;