import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

interface AuthFormProps {
    isLogin?: boolean;
}

const AuthForm = ({ isLogin = false }: AuthFormProps) => {
    const [name, setName] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(name);
        navigate("/");
    };

    return (
        <div className="p-4 max-w-md mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
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
