# INTRODUÇÃO

Nesse projeto vamos contruir um chat em tempo real semelhante ao WhatsApp. E nesse arquivo vamos comnetar o backend do projeto.

# Começando Projeto Backend

Primeiro vamos criar uma pasta chamada backend que vai ficar nosso backend.

Vamos entrar dentro da pasta backend abrir o terminal e digitar:

    npm init

E vamos dar vários enters e com isso criamos o arquivo package.json.

Vamos instalar algumas bibliotecas agora:

    npm install express cors axios

E vamos instalar o nodemon tammbém:

    npm install --save-dev nodemon

Agora no package.json vamos adicionar um comando para rodar o server:

    "scripts": {
        "start": "nodemon index.js"
    },

E vamos criar um novo arquivo na pasta backend chamado index.js.

E nele digitamos:

    const express = require("express");
    const cors = require("cors");

    const app = express();
    app.use(express.json());
    app.use(cors({ origin: true }));

    app.post("/authenticate", async (req, res) => {
        const { username } = req.body;
        return res.json({ username: username, secret: "123" });
    });

    app.listen(3001);

A rota /authenticate serve apenas para simular uma rota de login, ela vai retornar sempre nesse caso o username do usuário e a senha padrão que colocamos como 1234.

Criamos um arquivo chamado request.rest.

Vamos instalar uma extensao chamada REST Client para nos ajudar.

Nesse arquivo digitamos:

    POST http://localhost:3001//login
    Content-Type: application/json

    { "username": "Allisson" }

Basicamente aqui a gente simula um POST em nossa rota e podemos ver o que isso no retorna, nesse caso como temos a extensão podemos fazer a requisição apertando o botão send request e ele nos retona o seguinte:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Vary: Origin
    Content-Type: application/json; charset=utf-8
    Content-Length: 38
    ETag: W/"26-apOle2VLdc8MomHqsEWswuTRqOE"
    Date: Sun, 05 Nov 2023 13:04:55 GMT
    Connection: close

    {
        "username": "Allisson",
        "secret": "123"
    }

# Chat Engine

Site: https://chatengine.io/docs/react/v1

Vamos usar o Chat Engine para nos ajudar a criar o chat. Primeiro tenho que criar uma conta e um novo projeto no site deles para conseguir meu Project ID e Private Key.

Vou instalar o dotenv para conseguir usar essas variáveis de estado.

Na nossa rota /authenticate precimos faze a conexão com a API do chat engine, então digitamos:

    require('dotenv').config()
    const express = require("express");
    const cors = require("cors");

    const app = express();
    app.use(express.json());
    app.use(cors({ origin: true }));

    app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

        try {

            const r = await axios.put(
                'https://api.chatengine.io/users/',
                {username: username , secret: username , first_name: username},
                {headers: {"private-key": process.env.PRIVATE_KEY}}
            )

            return res.status(r.status).json(r.data)

        } catch (e) {

            return res.status(e.response.staus).json(e.response.data)
        }
    });

Agora vamos testar, como o nosso servidor rodando vamos no arquivo request.rest e vamos adicionar um novo membro:

    POST http://localhost:3001/authenticate
    Content-Type: application/json

    { "username": "Sueli" }

E clicando no botão Send Request recebemos:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Vary: Origin
    Content-Type: application/json; charset=utf-8
    Content-Length: 351
    ETag: W/"15f-MZqRwrRpgaw/Z6MB2Krp/HWhjuo"
    Date: Sun, 05 Nov 2023 13:37:55 GMT
    Connection: close

    {
        "id": 315202,
        "is_authenticated": true,
        "last_message": {
            "text": "",
            "created": "",
            "attachments": []
        },
        "username": "Sueli",
        "secret": "pbkdf2_sha256$260000$6K9viuggePqwRxV3abexGx$f6wMNRJmpAWLc0Y88HN5UZtHTlXghE7+lPpAPovozcM=",
        "email": "",
        "first_name": "Sueli",
        "last_name": "",
        "avatar": null,
        "custom_json": "{}",
        "is_online": false,
        "created": "2023-11-05T13:37:17.993735Z"
    }

Lembrando que é obrigatorio eu passr os parametros username e minha private key, mas eu posso também passar parâmetros secundários como email, last_name e também posso criar um json personalizado.
