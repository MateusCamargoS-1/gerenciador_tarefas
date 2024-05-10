# Gerenciador de Tarefas

Este repositório contém um aplicativo para gerenciamento de tarefas, composto por um backend e um frontend. O backend é desenvolvido com Node.js, Express e MongoDB, enquanto o frontend é desenvolvido com HTML, CSS e Typescript.

## Backend

O backend oferece uma API RESTful para criar, atualizar, excluir e listar tarefas. Utiliza o MongoDB como banco de dados e fornece endpoints para interação com o frontend.

### Arquivos do Projeto

- **backend/package.json**: Arquivo de configuração do Node.js que lista as dependências do projeto e define scripts de execução.

- **backend/controleTarefas.ts**: Contém controladores para lidar com as requisições HTTP relacionadas às tarefas, como criação, atualização, exclusão e listagem de tarefas.

- **backend/rotasTarefa.ts**: Define as rotas da API e associa cada rota a um controlador correspondente.

- **backend/validarDadosTarefa.ts**: Contém middleware para validar os dados das tarefas e verificar se o título é único antes de criar uma nova tarefa.

- **backend/modeloTarefa.ts**: Define o esquema do MongoDB para o modelo de tarefa e exporta o modelo mongoose correspondente.

- **backend/db.ts**: Arquivo de configuração para conectar o aplicativo ao banco de dados MongoDB.

- **backend/app.ts**: Configura o aplicativo Express, incluindo o uso de middleware como CORS e cookie-parser, e importa as rotas definidas.

- **backend/server.ts**: Inicializa o servidor Express e o faz ouvir na porta especificada.

### Executando o Projeto Backend

1. Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

2. Clone este repositório em seu ambiente local.

3. No diretório raiz do projeto, navegue até o diretório `backend`.

4. Instale as dependências usando o seguinte comando:

    ```
    npm install
    ```

5. Inicie o servidor executando o seguinte comando:

    ```
    npm run dev
    ```

Isso iniciará o servidor na porta especificada no arquivo `server.ts`.

## Frontend

O frontend oferece uma interface de usuário para interagir com a API RESTful fornecida pelo backend. Permite a criação, atualização, exclusão e listagem de tarefas, além de exibir alertas para feedback do usuário.

### Arquivos do Projeto

- **index.html**: Arquivo HTML principal que contém a estrutura da página web.

- **style.css**: Arquivo CSS para estilização da página.

- **index.ts**: Arquivo Typescript que contém a lógica de interação do usuário e as requisições HTTP para o backend.

### Executando o Projeto Frontend

1. Certifique-se de ter o servidor backend em execução localmente na porta 8080.

2. Clone este repositório em seu ambiente local.

3. Inicie a aplicação executando o seguinte comando:

    ```
    npm run server
    ```

## Dependências Externas

### Backend

- **express**: Framework web para Node.js, utilizado para criar APIs RESTful.
- **mongoose**: ODM (Object Data Modeling) para MongoDB, simplifica a interação com o banco de dados MongoDB.
- **cors**: Middleware para Express que permite configurar a política de mesma origem.
- **csurf**: Middleware para Express usado para prevenir ataques CSRF (Cross-Site Request Forgery). (sem sucesso)
- **typescript**: Linguagem de programação que adiciona tipagem estática opcional ao JavaScript.

### Frontend

- **Axios**: Biblioteca para fazer requisições HTTP baseadas em Promises. Utilizada para interagir com o backend e consumir a API RESTful.
- **Date-fns**: Biblioteca JavaScript para manipulação de datas. Utilizada para formatar as datas das tarefas.
