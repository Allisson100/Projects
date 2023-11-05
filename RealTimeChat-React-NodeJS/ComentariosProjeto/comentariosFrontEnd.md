# INTRODUÇÃO

Nesse projeto vamos contruir um chat em tempo real semelhante ao WhatsApp. E nesse arquivo vamos comentar o frontend do projeto.

# Começando Projeto Frontend

Vamos agora criar uma pasta chamada frontend e dentro dela vamos criar o nosso projeto React com o Vite.

Depois de instalar as dependencias vamos fazer a limpa padrão nos arquivos.

E de momento eu desabilitei o strict mode do react, pois aparentemente não funciona bem com websockets, mas vou testar depois.

Vamos instalar o axios também em nosso projeto frontend.

Vamos instalar a biblioteca react-chat-engine-advanced.
Vamos instalar a biblioteca react-chat-engine-pretty.

Ambas as biblioteca servem para customizar a página do chat, você pode optar por qualquer uma.

# Explicação

No arquivo principal do projeto App.jsx digitamos:

    import { useState } from "react";
    import "./App.css";
    import AuthPage from "./pages/Auth";
    import ChatsPage from "./pages/ChatPage";

    function App() {
        const [user, setUser] = useState(undefined);

        const handleAuth = (user) => {
            setUser(user);
        };

        if (!user) {
            return <AuthPage onAuth={handleAuth} />;
        } else {
            return <ChatsPage user={user} />;
        }
    }

    export default App;

Basicamente temos duas páginas, uma que carrega logo quando a aplicação abre que é a AuthPage e a outra página é o ChatsPage que vai carregar os dados na página de um novo usuário ou a página de uma pessoa que já tem cadastro.

Vale lembrar que estamos usando um API chamada Chat Engine que nos auxilia a criar um chat de maneira mais fácil.

Vamo explicar como cadastramos novos usuário ou buscamos usuários cadastrados.

# Arquivo index Auth:

    import axios from "axios";

    const AuthPage = ({ onAuth }) => {
        const onSubmit = async (e) => {
            e.preventDefault();
            try {
                const { value } = e.target[0];
                const response = await axios.post("http://localhost:3001/authenticate", {
                    username: value,
            });
                onAuth({ ...response.data, secret: value });
            } catch (error) {
                console.log("error", error);
            }
        };

        return (
            <div className="background">
                <form onSubmit={onSubmit} className="form-card">
                    <div className="form-title">Welcome 👋</div>

                    <div className="form-subtitle">Set a username to get started</div>

                    <div className="auth">
                    <div className="auth-label">Username</div>
                    <input className="auth-input" name="username" />
                    <button className="auth-button" type="submit">
                        Enter
                    </button>
                    </div>
                </form>
            </div>
        );
    };

    export default AuthPage;

Nessa parte da página de autenticação temos um formulário padrão que ao clicarmos no botão enviar chamamos a função onSubmit:

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { value } = e.target[0];
            const response = await axios.post("http://localhost:3001/authenticate", {
                username: value,
        });
            onAuth({ ...response.data, secret: value });
        } catch (error) {
            console.log("error", error);
        }
    };

Essa função como padrão para o comportamento padrão do formulário com o e.preventDefault() e depois temos que fazer a requisição para nosso servidor node através do método POST.

Nele devemos passar somente username do usuário e essa rota funciona da seguinte forma lá no node:

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

            return res.status(e.response.status).json(e.response.data)
        }
    });

Quando fazemos a requisição no nosso frontend para nosso servidor node, o servidor vai nos retornar os dados de um novo usuário ou de um usuário já existente, claro que desse forma que criamos nossa aplicação faz com que não podemos ter usuários com o mesmo nome e é por isso também que na tela de login só recebemos o nome do usuário e não a senha dele.

E com isso a rota nos retorna os dados do usuário em formato de json e lá no meu react eu salvo esses dados na variável de estado e com isso carregar esses dados na página ChatPage.

# ChatPage

    import { PROJECT_ID } from "../../env";
    import { PrettyChatWindow } from "react-chat-engine-pretty";

    const ChatsPage = (props) => {
        return (
            <div style={{ height: "100vh" }}>
                <PrettyChatWindow
                    projectId={PROJECT_ID}
                    username={props.user.username}
                    secret={props.user.secret}
                    style={{ height: "100%" }}
                />
            </div>
        );
    };

    export default ChatsPage;

Utilizamos a biblioteca react-chat-engine-pretty para fazer toda a parte do css para nós. Basicamente essa biblioteca trabalha junto com a nossa API e através dos parâmetros ela monta a interface de usuário para nós.

Testei e realmente o modo estrito do javascript da erro no websocket.
