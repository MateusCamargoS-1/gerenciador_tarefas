import mongoose, {Schema, Document } from "mongoose";

export interface Tarefa extends Document {
    title: string,
    description: string,
    createdAt: Date,
    updateAt: Date
}

const tarefaSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Number, default: Date.now}
});

export default mongoose.model<Tarefa>('Tarefa', tarefaSchema);