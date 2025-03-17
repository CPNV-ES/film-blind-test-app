import { useParams, useNavigate } from "react-router-dom";
import QuestionComponent from "../components/Question.tsx";
import { Question, MovieInfo } from "../models/Question.ts";
import { useState, useEffect, useRef } from "react";
import { GamePartyService } from "../services/game-party.service.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { ApiService } from "../services/api.service.ts";

const Quiz = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const gamePartyServiceRef = useRef(new GamePartyService());
    const totalQuestions = parseInt(quizId || "10", 10);
    const [showMovieInfo, setShowMovieInfo] = useState(false);
    const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

    useEffect(() => {
        const initGame = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!user) {
                    navigate("/login");
                    return;
                }

                await gamePartyServiceRef.current.startNewGame(user.id, totalQuestions);

                const question = gamePartyServiceRef.current.getCurrentQuestion();
                if (!question) {
                    throw new Error("Impossible de charger la question");
                }

                setCurrentQuestion(question);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Une erreur est survenue");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        initGame();
    }, [navigate, quizId, totalQuestions, user]);

    const handleAnswer = async (answer: string) => {
        if (!currentQuestion) return;
        
        try {
            const selectedAnswer = currentQuestion.answers.find(a => a.text === answer);
            if (!selectedAnswer) {
                throw new Error("Réponse non valide");
            }

            const questionResponse = await ApiService.getQuestionAnswer(currentQuestion.id);
            setMovieInfo(questionResponse.movieInfo);
            
            const isCorrect = await gamePartyServiceRef.current.answerCurrentQuestion(selectedAnswer.id);
            setIsCorrectAnswer(isCorrect);
            
            setShowMovieInfo(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            console.error(err);
        }
    };

    const handleNext = async () => {
        setShowMovieInfo(false);
        setMovieInfo(null);
        setIsCorrectAnswer(null);

        const nextQuestion = gamePartyServiceRef.current.getCurrentQuestion();
        if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
        } else {
            const score = await gamePartyServiceRef.current.getScore()
            navigate('/quiz-summary', {
                state: {
                    score: score
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                <h4 className="alert-heading">Erreur</h4>
                <p>{error}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <button 
                        className="btn btn-outline-danger"
                        onClick={() => navigate('/')}
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    if (!currentQuestion) {
        return <div>Aucune question disponible</div>;
    }

    return (
        <div className="text-center h-100">
            {showMovieInfo && movieInfo ? (
                <div className="container my-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h3>{movieInfo.title} ({movieInfo.year})</h3>
                            {isCorrectAnswer !== null && (
                                <div className={`alert ${isCorrectAnswer ? 'alert-success' : 'alert-danger'} mt-2`}>
                                    {isCorrectAnswer ? 'Bonne réponse !' : 'Mauvaise réponse !'}
                                </div>
                            )}
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    {movieInfo.poster && (
                                        <img 
                                            src={movieInfo.poster} 
                                            alt={`Affiche de ${movieInfo.title}`} 
                                            className="img-fluid rounded"
                                        />
                                    )}
                                </div>
                                <div className="col-md-8 text-start">
                                    <p className="card-text">{movieInfo.description}</p>
                                    <p>
                                        <strong>Année : </strong>{movieInfo.year} <br/>
                                        <strong>Note :</strong> {movieInfo.rating}/10
                                    </p>
                                    {movieInfo.url && (
                                        <a 
                                            href={movieInfo.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            Plus d'informations
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button 
                                className="btn btn-lg btn-primary"
                                onClick={handleNext}
                            >
                                Question suivante
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <QuestionComponent
                    key={currentQuestion.id}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                />
            )}
        </div>
    );
};

export default Quiz;
