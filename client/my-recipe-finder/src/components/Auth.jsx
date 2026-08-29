import { useState } from "react";
import { registerUser, loginUser } from "../api";

export default function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
        const result = isLogin
            ? await loginUser(email, password)
            : await registerUser(username, email, password);

        if (!result.success) {
            setError(result.message || "Invalid email or password");
            return;
        }

        if (isLogin) {
            onLogin(result.data.accessToken, result.data.user);
        } else {
            setIsLogin(true);
            setError("Account created — please log in.");
        }
    } catch (err) {
        setError("Something went wrong. Please try again.");
    }
}

    return (
        <section className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isLogin ? "Welcome back" : "Create an account"}</h2>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="auth-error">{error}</p>}

                <button type="submit">{isLogin ? "Log in" : "Sign up"}</button>

                <p className="auth-toggle">
                    {isLogin ? "New here?" : "Already have an account?"}{" "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Create an account" : "Log in"}
                    </span>
                </p>
            </form>
        </section>
    );
}