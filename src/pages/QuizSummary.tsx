import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface FilmInfo {
    title: string;
    director: string;
    year: string;
    description: string;
    image?: string;
}

interface QuizSummaryState {
    answers: {
        questionId: number;
        answer: string;
        time: number;
        videoId?: string;
        correctAnswer?: string;
        filmInfo?: FilmInfo;
    }[];
    totalQuestions: number;
}

const QuizSummary = () => {
    const location = useLocation();
    const { answers, totalQuestions } = location.state as QuizSummaryState;
    const [selectedFilmInfo, setSelectedFilmInfo] = useState<FilmInfo | null>(null);

    const totalTime = answers.reduce((acc, curr) => acc + curr.time, 0);
    const averageTime = totalTime / answers.length;

    const opts: YouTubeProps['opts'] = {
        height: '200',
        width: '100%',
        playerVars: {
            autoplay: 0,
            rel: 0,
        },
    };

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.playVideo();
    }

    const handleShowFilmInfo = (filmInfo?: FilmInfo) => {
        if (filmInfo) {
            setSelectedFilmInfo(filmInfo);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Récapitulatif du Quiz</h1>
            
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Statistiques Générales</h5>
                    <p className="card-text">Nombre total de questions: {totalQuestions}</p>
                    <p className="card-text">Temps total: {totalTime.toFixed(2)} secondes</p>
                    <p className="card-text">Temps moyen par question: {averageTime.toFixed(2)} secondes</p>
                </div>
            </div>

            <div className="accordion" id="answersAccordion">
                {answers.map((answer, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                            >
                                Question {index + 1} - {answer.correctAnswer || "Film inconnu"}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#answersAccordion"
                        >
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        {answer.videoId && (
                                            <div className="mb-3">
                                                <YouTube videoId={answer.videoId} opts={opts} onReady={onPlayerReady} />
                                            </div>
                                        )}
                                        <p><strong>Votre réponse:</strong> {answer.answer}</p>
                                        <p><strong>Réponse correcte:</strong> {answer.correctAnswer || "Non disponible"}</p>
                                        <p><strong>Temps:</strong> {answer.time.toFixed(2)} secondes</p>
                                        
                                        {answer.filmInfo && (
                                            <button 
                                                className="btn btn-info mt-2"
                                                onClick={() => handleShowFilmInfo(answer.filmInfo)}
                                                data-bs-toggle="modal" 
                                                data-bs-target="#filmInfoModal"
                                            >
                                                Informations sur le film
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal pour les informations du film */}
            <div className="modal fade" id="filmInfoModal" tabIndex={-1} aria-labelledby="filmInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filmInfoModalLabel">
                                {selectedFilmInfo?.title} ({selectedFilmInfo?.year})
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {selectedFilmInfo?.image && (
                                    <div className="col-md-4">
                                        <img src={selectedFilmInfo.image} alt={selectedFilmInfo.title} className="img-fluid rounded" />
                                    </div>
                                )}
                                <div className={selectedFilmInfo?.image ? "col-md-8" : "col-12"}>
                                    <p><strong>Réalisateur:</strong> {selectedFilmInfo?.director}</p>
                                    <p><strong>Année:</strong> {selectedFilmInfo?.year}</p>
                                    <p><strong>Description:</strong></p>
                                    <p>{selectedFilmInfo?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <Link to="/dashboard" className="btn btn-primary">
                    Retour au Tableau de Bord
                </Link>
            </div>
        </div>
    );
};

export default QuizSummary;
