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
