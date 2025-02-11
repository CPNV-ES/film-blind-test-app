import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Accueil</h1>
            <Link to="/about">Aller à About</Link>
        </div>
    );
};

export default Home;
