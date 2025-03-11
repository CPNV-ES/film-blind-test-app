import { useParams, useNavigate } from "react-router-dom";
import QuestionComponent from "../components/Question.tsx";
import { Question } from "../models/Question.ts";
import { useState, useEffect, useRef } from "react";
import { GamePartyService } from "../services/game-party.service.ts";
import { useAuth } from "../context/AuthContext.tsx";

const Quiz = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const gamePartyServiceRef = useRef(new GamePartyService());
    const totalQuestions = parseInt(quizId || "10", 10);

    // Initialiser le jeu au chargement
    useEffect(() => {
        const initGame = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!user?.id) {
                    throw new Error("Vous devez être connecté pour jouer");
                }
                
                // Démarrer une nouvelle partie
                await gamePartyServiceRef.current.startNewGame(user.id, totalQuestions);
                
                // Obtenir la première question
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
    }, [quizId, user]);

    // Gérer la réponse à une question
    const handleAnswer = async (answer: string) => {
        if (!currentQuestion) return;
        
        try {
            // Trouver l'ID de la réponse sélectionnée
            const selectedAnswer = currentQuestion.answers.find(a => a.text === answer);
            if (!selectedAnswer) {
                throw new Error("Réponse non valide");
            }
            
            // Soumettre la réponse
            await gamePartyServiceRef.current.answerCurrentQuestion(selectedAnswer.id);
            
            // Obtenir la question suivante
            const nextQuestion = gamePartyServiceRef.current.getCurrentQuestion();
            if (nextQuestion) {
                setCurrentQuestion(nextQuestion);
            } else {
                // Fin du quiz
                navigate('/quiz-summary');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            console.error(err);
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
            <QuestionComponent 
                question={currentQuestion}
                onAnswer={handleAnswer}
                onNext={() => {}} // Plus besoin de onNext car handleAnswer gère déjà le passage à la question suivante
            />
        </div>
    );
};

export default Quiz;
