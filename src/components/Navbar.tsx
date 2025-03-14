import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const {user, logout} = useAuth();

    useAuth().getUser();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Film-Blind-Test</Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Tableau de bord</Link>
                            </li>
                        )}
                    </ul>
                    
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                                <Link
                                    className="btn btn-outline-secondary d-flex align-items-center mx-2"
                                    to="/profile"
                                >
                                    <span className="me-2">👤</span>
                                    {user.username}
                                </Link>
                                <button className="btn btn-danger" onClick={logout}>
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link className="nav-link" to="/login">Se connecter</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
