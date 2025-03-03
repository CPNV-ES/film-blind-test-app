import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

interface AuthFormProps {
    isLogin?: boolean;
}

const AuthForm = ({ isLogin = false }: AuthFormProps) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(name);
        navigate("/");
    };

    return (
        <div className="p-4 max-w-md mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-4">{isLogin ? "Connection" : "Inscription"}</h2>
            <form onSubmit={handleSubmit} className="mb-3">

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {isLogin ? "Se connecter" : "S'inscrire"}
                </button>
            </form>

            <Link to={isLogin ? "/register" : "/login"} className="text-blue-500 text-sm">
                {isLogin ? "Créer un compte" : "Déjà inscrit ? Connectez-vous"}
            </Link>
        </div>
    );
};

export default AuthForm;
