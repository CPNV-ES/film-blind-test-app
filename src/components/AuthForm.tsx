import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

interface AuthFormProps {
    isLogin?: boolean;
}

const AuthForm = ({ isLogin = false }: AuthFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, register, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            navigate("/dashboard");
        } catch (err) {
            // L'erreur est déjà gérée dans le contexte d'authentification
            console.error("Authentication error:", err);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {isLogin ? "Connexion" : "Inscription"}
                            </h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Nom d'utilisateur
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required={!isLogin}
                                        />
                                    </div>
                                )}
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    {(isLogin ? "Se connecter" : "S'inscrire")}
                                </button>
                            </form>
                            
                            <div className="text-center mt-3">
                                {isLogin ? (
                                    <p>
                                        Pas encore de compte ?{" "}
                                        <Link to="/register">S'inscrire</Link>
                                    </p>
                                ) : (
                                    <p>
                                        Déjà un compte ?{" "}
                                        <Link to="/login">Se connecter</Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
