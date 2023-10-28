# Introdução

Vamos fazer um projeto envolvendo o banco de dados, NodeJs e React. Tenho o intuito de aprender como utilizar essas tecnologias juntas. Com o projeto será possível salvar dados do usuário no banco de dados e vamos buscar esses dados e mostrá-los na nossa aplicação.

# Banco de dados

Vamos utilizar o SGBD MySQl e para isso precisamos intalá-lo em nossa máquina. A instalação é simples, basta olhar alguns vídeos no YT caso tiver dificuldades.

### Criando o schema

Dentro do Workbench do MySQL vamos criar uma novo schema e dar um nome para nosso banco, no meu caso escolhi o nome projetocrud.

E vamos criar a tabela:

Primeiros falamos qual banco de dados vamos usar:

    USE projetocrud;

Depois criamos a tabela com o comando:

    CREATE TABLE usuarios (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        fone VARCHAR(255) NOT NULL,
        data_nascimento DATE NOT NULL,
        PRIMARY KEY (id)
    );

E para usarmos o banco de dados localmente temos que abrir uma nova instancia ali do MySQL e digitamos:

    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha';

Para inserir um usuario na tabela digitamos:

    INSERT INTO usuarios (nome, email, fone, data_nascimento)
    VALUES ('Nome do Usuário', 'usuario@email.com', '1234567890', '2000-01-01');

# Backend Frontend

Agora vamos criar duas pastas dentro da pasta princiapl do nosso projeto, uma vai chamar api e outra fronte end.

## Backend

Vamos comecar com o backend.

Vamos acessar nossa pasta api no terminal e digitar o comando:

    npm init -y

E agora vamos instalar as bibliotecas que vamos utilizar nesse projeto:

    yarn add express nodemon mysql cors

Agora no arquivo package.json vamos fazer uma alteração ficando da seguinte forma:

    {
        "name": "api",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "type": "module",
        "scripts": {
            "start": "nodemon index.js"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "cors": "^2.8.5",
            "express": "^4.18.2",
            "mysql": "^2.18.1",
            "nodemon": "^3.0.1"
        }
    }

Apenas trocamos o comando do script que antes estava como test e trocamos para o start utilizando o nodemon e também acrescentamos o "type":"module",

Agora dentro da pasta api vamos criar um arquivo chamado index.js.

Dentro do index.js vamos começar as configurações do express:

    import express from "express";
    import cors from "cors";

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.listen(8800);

- importamos o express e o cors;
- definimos uma constante como express;
- uitilizamos um app.use(express.json()) para utilizar o jason como método de postagem;
- o app.use(cors()) serve para evitar conflitos, pois estamos usando o banco localmente;
- app.listen(8800), usa a porta 8800 para o servidor.

### Configurando o banco

Vamos agora criar um novo arquivo chama db.js para fazermos a configuração do banco de dados:

    import mysql from "mysql";

    export const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sua_senha",
        database: "o_nome_do_seu_banco",
    });

### Rotas

Como é um projeto simples vamos utilizar somente de uma rota. Para melhorar a organização do projeto vamos criar uma nova pasta chamada routes e outra chamada controllers e em cada uma vamos criar um arquivo chamado users.js.

No arquivo users.js da pasta routes vamos digitar:

    import express from "express";
    import { getUsers } from "../controllers/users.js";

    const router = express.Router();

    router.get("/", getUsers);

    export default router

No arquivo user.js da pasta controllers digitamos:

    import { db } from "../db.js";

    export const getUsers = (_, res) => {
        const q = "SELECT * FROM usuarios";

        db.query(q, (err, data) => {
            if (err) return res.json(err);

            return res.status(200).json(data);
        })
    }

Agora dentro do nosso arquivo index.js digitamos:

    import express from "express";
    import cors from "cors";

    import userRoutes from "./routes/users.js";

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use("/", userRoutes);

    app.listen(8800);

Para verificar se tudo isso está funcionando digitamos no terminal:

    yarn start

E vamos lá no navegador acessar a rota localhost:8800

## Frontend

Agora vamos começar a criar nosso frontend. Primeiro vamos para o servidor e vamos entrar na pasta frontend que já criamos.

E dentro da pasta vamos digitar:

    npx create-react-app ./

Agora vamos instalar algumas biblioteca para o front end, dentro da pasta do front end vamos no terminal e digitamos:

    yarn add styled-components axios react-icons react-toastify

O react-toastify é o que faz aparecer uma mensagem quando um usuário for excluído do banco de dados.

Apagamos alguns arquivos depois que o CRA criar por padrão e também acrescentamos uma font do google fonts lá no html.

Agora vou criar um estilo global para o projeto, para isso irei criar uma pasta chamada styles dentro da pasta src e dentro da pasta vamos criar um arquivo chamado global.js e nele digitamos:

    import { createGlobalStyle } from "styled-components";

    const Global = createGlobalStyle `

        * {
            margin: 0;
            padding: 0;
            font-family: 'poppins', sans-serif;
        }

        body {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            background-color: #f2f2f2;
        }
    `;

    export default Global

### App.js

Após criarmos o estilo global vamos no arquivo App.js e digitamos:

    import GlobalStyle from "./styles/global";
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";

    function App() {
    return (
        <>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        <GlobalStyle />
        </>
    );
    }

    export default App;

Dessa forma já configuramos os estilos iniciais e agora vamos começar a estilizar com o styles components:

Estilizações por enquanto:

App.js:

    import GlobalStyle from "./styles/global";
    import styled from "styled-components";
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import Form from "./components/Form";
    import Grid from "./components/Grid";

    const Container = styled.div `
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    `;

    const Title = styled.h2 ``;

    function App() {
        return (
            <>
                <Container>
                    <Title>USUÁRIOS</Title>
                    <Form />
                    <Grid />
                </Container>
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
                <GlobalStyle />
            </>
        );
    }

    export default App;

Form.js:

    import { useRef } from "react";
    import styled from "styled-components";

    const FormContainer = styled.form `
        display: flex;
        align-items: flex-end;
        gap: 10px;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0px 0px 5px #ccc;
        border-radius: 5px;
    `

    const InputArea = styled.div `
        display: flex;
        flex-direction: column;
    `

    const Label = styled.label ``

    const Input = styled.input `
        width: 120px;
        padding: 0 10px;
        border: 1px solid #bbb;
        border-radius: 5px;
        height: 40px;
    `

    const Button = styled.button `
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        background-color: #2c73d2;
        color: white;
        height: 42px;
    `

    const Form = ({ onEdit }) => {

        const ref = useRef()

        return (
            <FormContainer>
                <InputArea>
                    <Label>Nome</Label>
                    <Input name="nome" />
                </InputArea>
                <InputArea>
                    <Label>E-mail</Label>
                    <Input name="email" type="email" />
                </InputArea>
                <InputArea>
                    <Label>Telefone</Label>
                    <Input name="fone" />
                </InputArea>
                <InputArea>
                    <Label>Data de Nascimento</Label>
                    <Input name="data_nascimento" type="date" />
                </InputArea>

                <Button type="submit">SALVAR</Button>
            </FormContainer>
        )
    }

    export default Form;

Grid.js:

    import styled from "styled-components"

    import axios from "axios"
    import { FaTrash , FaEdit } from "react-icons/fa"
    import { toast } from "react-toastify"

    const Table = styled.table `
        width: 100%;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0px 0px 5px #ccc;
        border-radius: 5px;
        max-width: 800px;
        margin: 20px auto;
        word-break: break-all;
    `

    export const Thead = styled.thead ``;

    export const Tbody = styled.tbody ``;

    export const Tr = styled.tr ``;

    export const Th = styled.th `
        text-align: start;
        border-bottom: inset;
        padding-bottom: 5px;

        @media (max-width: 500px) {
            ${(props) => props.onlyweb && "display: none"}
        }
    `

    export const Td = styled.td `
        padding-top: 15px;
        text-align: ${(props) => (props.alignCenter ? "center" : "start")};
        width: ${(props) => props.width ? props.width : "auto"};

        @media (max-width: 500px) {
            ${(props) => props.onlyweb && "display: none"}
        }
    `


    const Grid = ({ users }) => {
        return (
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th onlyweb>Fone</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((item ,i) => (
                        <Tr key={i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" onlyweb>
                                {item.fone}
                            </Td>
                            <Td alignCenter width="5%">
                                <FaEdit />
                            </Td>
                            <Td alignCenter width="5%">
                                <FaTrash/>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        )
    }

    export default Grid

Até o momento essas são as estilizações, os arquivos Form.js e Grid.js estão dentro de uma pasta chamada components que foi criada dentro da pasta src.

### Pegando dados do banco de dados no frontend

Agora vamos fazer a parte do banco de dados para conseguirmos pegar os dados de lá e fazer um map no nosso componente para mostrarmos no frontend.

Então vamos mexer no arquivo App.js ficando da seguinte forma:

    function App() {

        const [users , setUsers] = useState([])
        const [onEdit , setOnEdit] = useState(null)

        const getUser = async () => {
            try {
                const res = await axios.get("http://localhost:8800")
                setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)))
            } catch (error) {
                toast.error(error)
            }
        }

        useEffect(() => {
            getUser()
        }, [setUsers])

        return (
            <>
                <Container>
                    <Title>USUÁRIOS</Title>
                    <Form />
                    <Grid users={users}/>
                </Container>
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
                <GlobalStyle />
            </>
        );
    }

Nosso componente por enquanto ficou dessa forma.

Craimos dus variaveis de estado:

    const [users , setUsers] = useState([])
    const [onEdit , setOnEdit] = useState(null)

O onEdit vamos usar daqui a pouco.

E a variável users, são os dados dos usuários que estão lá no banco.

Para fazer a busca desses usuários lá no banco criamos uma função:

    const getUser = async () => {
        try {
            const res = await axios.get("http://localhost:8800")
            setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }

Ele faz uma requisição na api que criamos e ele coloca em ordem alfabetica os nomes pelo sort(). E através do useEffect fazemos essa requisição quando a página carrega:

    useEffect(() => {
        getUser()
    }, [setUsers])

## Método POST na api

Vamos voltar um pouco agora na api, pois vamos criar o método post para podermos colocar os dados do usuario no banco de dados.

No arquivo user.js da pasta controllers vamos acrescentar o seguinte código:

    import { db } from "../db.js";

    export const getUsers = (_, res) => {
        const q = "SELECT * FROM usuarios";

        db.query(q, (err, data) => {
            if (err) return res.json(err);

            return res.status(200).json(data);
        })
    }

    export const addUser = (req, res) => {
        const q = "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)"


        const values = [
            req.body.nome,
            req.body.email,
            req.body.fone,
            req.body.data_nascimento,
        ]

        db.query(q, [values], (err) => {
            if (err) return res.json(err)

            return res.status(200).json("Usuário criado com sucesso")
        })
    }

Criamos uma nova função, onde eu vou pegar os dados do formulário através desse req.body.O_NAME_DO_CAMPO e manda para o banco. Agora vou criar uma nova função que será o update do banco, ou seja, caso eu queira atualizar algum dado:

    export const updateUser = (req, res) => {
        const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?"

        const values = [
            req.body.nome,
            req.body.email,
            req.body.fone,
            req.body.data_nascimento,
        ]

        db.query(q, [...values, req.params.id], (err) => {
            if (err) return res.json(err)

            return res.status(200).json("Usuário atualizado com sucesso")
        })
    }

E também vamos criar a função para deleta o usuário do banco:

    export const deleteUser = (req, res) => {
        const q = "DELETE FROM usuarios WHERE `id` = ?"

        db.query(q, [req.params.id], (err) => {
            if (err) return res.json(err)

            return res.status(200).json("Usuário deletado com sucesso")
        })
    }

Agora vamos acrescentar código dentro do arquivo users.js da pasta routes:

    import express from "express";
    import { getUsers , addUser , updateUser , deleteUser } from "../controllers/users.js";

    const router = express.Router();

    router.get("/", getUsers)

    router.post("/", addUser)

    router.put("/:id", updateUser)

    router.delete("/:id", deleteUser)

    export default router

## Voltando para o Frontend

Então no arquivo Grid.js digitamos:

    const Grid = ({ users, setUsers, setOnEdit }) => {

        const handleEdit = (item) => {
            setOnEdit(item)
        }

        const handleDelete = async (id) => {
            await axios
                .delete("http://localhost:8800/" + id)
                .then(({data}) => {
                    const newArray = users.filter((user) => user.id !== id)

                    setUsers(newArray)
                    toast.success(data)
                })
                .catch(({data}) => toast.error(data))

            setOnEdit(null)
        }

        return (
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th $onlyweb>Fone</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((item ,i) => (
                        <Tr key={i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" $onlyweb>
                                {item.fone}
                            </Td>
                            <Td $alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)}/>
                            </Td>
                            <Td $alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item.id)}/>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        )
    }

Acrescentamos as funções handleEdit e handleDelete.

Agora no arquivo Form.js:

    const Form = ({ onEdit , setOnEdit, getUsers }) => {

        const ref = useRef()

        useEffect(() => {
            if(onEdit) {
                const user = ref.current

                user.nome.value = onEdit.nome;
                user.email.value = onEdit.email;
                user.fone.value = onEdit.fone;
                user.data_nascimento.value = onEdit.data_nascimento;
            }
        }, [onEdit])

        const handleSubmit = async (e) => {
            e.preventDefault();

            const user = ref.current;

            if (
                !user.nome.value ||
                !user.email.value ||
                !user.fone.value ||
                !user.data_nascimento.value
            ) {
                return toast.warn("Preencha todos os campos!")
            }

            if(onEdit) {
                await axios
                    .put("http://localhost:8800/" + onEdit.id, {
                        nome: user.nome.value,
                        email: user.email.value,
                        fone: user.fone.value,
                        data_nascimento: user.data_nascimento.value,
                    })
                    .then(({ data }) => toast.success(data))
                    .catch(({ data }) => toast.error(data))
            } else {
                await axios
                    .post("http://localhost:8800", {
                        nome: user.nome.value,
                        email: user.email.value,
                        fone: user.fone.value,
                        data_nascimento: user.data_nascimento.value,
                    })
                    .then(({ data }) => toast.success(data))
                    .catch(({ data }) => toast.error(data))
            }

            user.nome.value = ""
            user.email.value = ""
            user.fone.value = ""
            user.data_nascimento.value = ""

            setOnEdit(null)
            getUsers()

        }

        return (
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>Nome</Label>
                    <Input name="nome" />
                </InputArea>
                <InputArea>
                    <Label>E-mail</Label>
                    <Input name="email" type="email" />
                </InputArea>
                <InputArea>
                    <Label>Telefone</Label>
                    <Input name="fone" />
                </InputArea>
                <InputArea>
                    <Label>Data de Nascimento</Label>
                    <Input name="data_nascimento" type="date" />
                </InputArea>

                <Button type="submit">SALVAR</Button>
            </FormContainer>
        )
    }

A variável onEdit serve basicamente para sabermo se estamos fazendo update de um item ou se estamos criando um novo e é importante deixálo como null na parte do delete para não causar conflito.

## Alteração banco de dados

Vamos apenas alterar um campo do banco de dados, nesse projeto vamos utilizar varchar no campo date e para isso digitamos o seguinte código para alterar:

ALTER TABLE usuarios
MODIFY data_nascimento VARCHAR(255);

## Observações

### Maneiras diferentes de fazer requisição para API

Usando como exemplo o método delete a seguir tem algumas maneiras diferentes de fazer a mesma coisa e isso serve para os demais métodos:

USANDO AXIOS COM .THEN() E .CATCH():

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({data}) => {
                const newArray = users.filter((user) => user.id !== id)

                setUsers(newArray)
                toast.success(data)
            })
            .catch(({data}) => toast.error(data))

        setOnEdit(null)
    }

USANDO AXIOS COM TRY CATCH:

    const handleDelete = async (id) => {
        try {
            const {data} = await axios.delete("http://localhost:8800/" + id)
            const newArray = users.filter((user) => user.id !== id)

            setUsers(newArray)
            toast.success(data)
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Erro ao excluir o item.");
            }
        }
    }

USANDO O FECTH QUE JÁ VEM POR PADRÃO NO JAVASCRIPT:

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8800/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                const data = await response.json();
                const newArray = users.filter((user) => user.id !== id);
                setUsers(newArray);
                toast.success(data);
            } else {
                const errorData = await response.json();
                toast.error(errorData);
            }

        } catch (error) {
            toast.error("Erro ao excluir o item.");
        }
    }

Utilizei o console para poder medir quanto tempo cada função dessa demora para executar e a mais rápida foi USANDO AXIOS COM TRY CATCH, utilizei o console.time("Tempo de execução handleDelete"); no inicio da função e console.timeEnd("Tempo de execução handleDelete"); no final dela para conseguri medir o tempo de execução.
