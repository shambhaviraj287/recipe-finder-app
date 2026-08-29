import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Auth from "./components/Auth";
import "./App.css";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    function handleLogin(accessToken) {
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
    }

    return (
        <>
            <Header />
            {token ? (
                <Main token={token} onLogout={handleLogout} />
            ) : (
                <Auth onLogin={handleLogin} />
            )}
        </>
    );
}

export default App;