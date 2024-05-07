import { Request, Response, NextFunction } from 'express';
import TarefaModel, { Tarefa } from '../models/modeloTarefa';

export const validarDadosTarefa = (req: Request, res: Response, next: NextFunction) => {
    const data: Tarefa = req.body;
    const title = data.title;
    const description = data.description;

    if (!title || !description || typeof title !== 'string' || typeof description !== 'string') {
        return res.status(400).json({ success: false, message: 'Os formatos de dados são inválidos' });
    }

    next();
}

export const verificarTituloUnico = async (req: Request, res: Response, next: NextFunction) => {
    const data: Tarefa = req.body;
    const title: string = data.title;

    try {
        const tarefaExistente = await TarefaModel.findOne({ title });
        if(tarefaExistente) {
            return res.status(400).json({ success: false, message: 'Ja existe uma tarefa com o mesmo titulo' });
        }
        next();
    } catch(err) {
        return res.status(500).json({success: false, message:  'Erro ao verificar a tarefa'});
    }
}
