import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/tarefas');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o Banco de Dados'));
db.once('open', () => {
    console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
})