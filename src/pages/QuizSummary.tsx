import {Link, useLocation} from "react-router-dom";

const QuizSummary = () => {
    const location = useLocation();
    const { score } = location.state;

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Votre Score</h1>

            <h1 className="text-center mb-5">{score}</h1>

            <div className="text-center mt-4">
                <Link to="/dashboard" className="btn btn-primary">
                    Retour au Tableau de Bord
                </Link>
            </div>
        </div>
    );
};

export default QuizSummary;
