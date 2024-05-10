# Documentação da Aplicação

## Visão Geral

Esta documentação fornece informações sobre a configuração e o uso da aplicação de gerenciamento de tarefas backend Node.js.

### Estrutura do Diretório

\```
backend/
│
├── src/                     # Código-fonte da aplicação
├── dockerfile               # Arquivo de configuração do Docker
├── nodemon.json             # Configurações do Nodemon
├── package-lock.json        # Lista de dependências do projeto (lock file)
├── package.json             # Descrição do projeto e dependências (manifest file)
└── tsconfig.json            # Configurações do TypeScript
\```

## Configuração do Docker

O arquivo \`dockerfile\` contém as instruções necessárias para criar um contêiner Docker para esta aplicação. Para construir e executar o contêiner, siga as etapas abaixo:

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Navegue até o diretório raiz da aplicação no terminal.
3. Execute o seguinte comando para construir a imagem Docker:

   \`\`\`sh
   docker build -t task-manager-app .
   \`\`\`

4. Depois que a imagem for construída com sucesso, você pode executar um contêiner com o seguinte comando:

   \`\`\`sh
   docker run -p 8080:8080 task-manager-app
   \`\`\`

   Este comando iniciará a aplicação e mapeará a porta 3000 do contêiner para a porta 8080 do host.

## Comandos Disponíveis

- \`npm dev\`: Inicia a aplicação em modo de desenvolvimento usando o Nodemon.

## Observações

- Certifique-se de ter todas as dependências necessárias instaladas localmente antes de construir a imagem Docker.
- Se necessário, ajuste as configurações de variáveis de ambiente no Dockerfile ou por meio de outras opções de configuração do Docker.
