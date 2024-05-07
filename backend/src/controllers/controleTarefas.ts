import {Request, Response} from 'express';
import TarefaModel, { Tarefa } from '../models/modeloTarefa';

export const pegarToken = (req: Request, res: Response) => {
    const csrfToken = req.csrfToken();
    res.json({ csrfToken });
}

export const todasTarefas = async (req: Request, res: Response) => {
    try {
        const tarefas = await TarefaModel.find({});
        if(tarefas.length === 0){
            return res.status(200).json({success: false, message: "Não possui nenhuma Tarefa", data: tarefas});
        }
        res.status(200).json({success: true, message: "Lista de todas as Tarefas", data: tarefas});
    } catch (error) {
        res.status(500).json({success: false, message: 'Erro ao buscar as tarefas.'});
    }
}

export const criarTarefa = async (req: Request, res: Response) => {
    const data: Tarefa = req.body;
    const title: string = data.title;
    const description: string = data.description;

    try {
        const novaTarefa: Tarefa = await TarefaModel.create({title, description});
        res.status(201).json({success: true, message: 'Nova Tarefa criada com sucesso!', data: novaTarefa});
    } catch (err) {
        res.status(500).json({success: false, message: 'Erro ao criar tarefa'});
    }
}

export const atualizarTarefa = async (req: Request, res: Response) => {
    const idTarefa: string = req.params.id;
    const data: Tarefa = req.body;
    const title: string = data.title;
    const description: string = data.description;

    if(title === '' || description === '') {
        return res.status(400).json({success: false, message: 'Os campos não podem ficar vazios!'});
    }

    try {
        const tarefaAtualizada = await TarefaModel.findByIdAndUpdate(idTarefa, {title, description}, {new: true});
        if(!tarefaAtualizada) {
            return res.status(404).json({success: false, message: 'Tarefa não encontrada ou não existe!'});
        }
        res.status(200).json({success: true, message: 'Tarefa atualizada com sucesso', data: tarefaAtualizada});
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar a tarefa.'});
    }
}

export const deletarTarefa = async (req: Request, res: Response) => {
    const idTarefa = req.params.id;
    
    try {
        const tarefaDeletada = await TarefaModel.findByIdAndDelete(idTarefa);
        if(!tarefaDeletada) {
            return res.status(404).json({success: false, message: 'Tarefa não encontrada ou não existe!'});
        }
        res.status(200).json({success: true, message: 'Tarefa deletada com sucesso!'});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Erro ao deletar tarefa'});
    }
}