import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const {user, logout} = useAuth();

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Film-Blind-Test</Link>
                <div className="d-flex">
                    {user ? (
                        <>
                            <span className="nav-link navbar-text me-4">Bonjour, {user.name}!</span>

                            <button className="btn btn-danger" onClick={logout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link className="nav-link" to="/login">Se connecter</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
