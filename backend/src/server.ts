import app from './app';

const port: number = 8080;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})