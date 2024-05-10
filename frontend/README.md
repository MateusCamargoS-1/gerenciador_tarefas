# Aplicação Frontend Dockerizada

Este repositório contém os arquivos necessários para dockerizar uma aplicação frontend.

## Pré-requisitos

- Docker instalado na sua máquina. Você pode baixá-lo [aqui](https://www.docker.com/get-started).

## Configuração do Dockerfile

```Dockerfile
FROM node:latest

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json /app/
COPY frontend/tsconfig.json frontend/webpack.config.js /app/
COPY frontend/public /app/public
COPY frontend/src /app/src

RUN npm install

EXPOSE 5500

CMD ["npm", "run", "server"]

# Construção da Imagem Docker
Para construir a imagem Docker, execute o seguinte comando no terminal, no diretório onde está localizado o Dockerfile:

```bash
docker build -t frontend-app .


Isso irá construir uma imagem com o nome `frontend-app`.

## Execução do Contêiner

Para executar o contêiner e iniciar a aplicação frontend, utilize o seguinte comando:

```markdown
```bash
docker run -p 5500:5500 frontend-app


Isso iniciará o servidor live e você poderá acessar a aplicação em `http://localhost:5500` no seu navegador.

## Compilação do TypeScript

Para compilar o TypeScript para JavaScript, execute o seguinte comando após iniciar o contêiner:

```markdown
```bash
docker run -p 5500:5500 frontend-app npm run dev


Isso irá compilar o TypeScript para JavaScript.

Esta documentação fornece instruções claras sobre como configurar, construir e executar a aplicação frontend em um ambiente Dockerizado.
