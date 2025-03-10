import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

const Home = () => {

    const {user} = useAuth();


    return (
        <div>
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Qu'est ce que c'est ?</h1>
                    <p className="col-md-12 fs-4">
                        Un blind test est un jeu où les participants doivent deviner l'origine d'un extrait audio. Notre site propose des concours de blind test sur les films, mettant au défi les joueurs de reconnaître des musiques provenant de films. Défiez vos amis et prouvez vos connaissances cinématographiques ! 🎬🎶
                    </p>
                    <Link to={user ? "/dashboard" : "/register"}>
                        <button className="btn btn-primary btn-lg" type="button">Commencer à jouer</button>
                    </Link>
                </div>
            </div>

            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Pourquoi créer un compte ?</h2>
                        <p>
                            Un compte est nécessaire pour enregistrer votre progression, participer aux concours, et affronter d'autres joueurs. Il vous permet de suivre vos scores, de gagner des récompenses et de monter dans le classement. De plus, avec un compte, vous pouvez créer ou rejoindre des parties privées pour défier vos amis.
                        </p>
                        <Link to={user ? "/dashboard" : "/register"}>
                            <button className="btn btn-outline-light" type="button">Commencer à jouer</button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Comment ça marche ?</h2>
                        <p>
                            Le jeu de blind-test sur le thème des musiques de films permet aux utilisateurs de jouer des parties de 10, 20 ou 30 musiques, avec 4 choix de films par chanson. Chaque bonne réponse rapporte des points, et un scoreboard général affiche les meilleurs scores. À la fin de chaque partie, un récapitulatif des chansons et des informations sur les films sélectionnés est présenté.
                        </p>
                        <Link to={user ? "/dashboard" : "/register"}>
                            <button className="btn btn-outline-dark" type="button">Commencer à jouer</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
