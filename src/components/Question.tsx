import {Answer, Question} from "../models/Question.ts";
import YouTube, {YouTubeProps} from "react-youtube";
import {useState, useEffect} from "react";

interface QuestionComponentProps {
    question: Question;
    onAnswer: (answer: string) => void;
    onNext: () => void;
}

const QuestionComponent = ({ question, onAnswer, onNext }: QuestionComponentProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // Reset states when question changes
    useEffect(() => {
        setSelectedAnswer(null);
        setShowAnswer(false);
    }, [question]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.playVideo();
    }

    const opts: YouTubeProps['opts'] = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
            rel: 0,
        },
    };

    const colors = ["btn-primary", "btn-success", "btn-warning", "btn-danger"];

    const handleAnswerClick = (answer: Answer) => {
        if (!selectedAnswer) {
            setSelectedAnswer(answer);
            setShowAnswer(true);
            onAnswer(answer.text);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center gap-4">
            <YouTube videoId={question.videoId} opts={opts} onReady={onPlayerReady} />
            <p className="fs-4">Une musique est entrain de jouer.</p>

            <div className="container">
                {question.answers.map((answer, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div className="row mb-3" key={index}>
                                <div className="col-6">
                                    <button
                                        className={`btn btn-lg w-100 ${colors[index % colors.length]} ${
                                            showAnswer && answer.isCorrect ? 'border-success border-3' : ''
                                        } ${selectedAnswer === answer ? 'opacity-75' : ''}`}
                                        onClick={() => handleAnswerClick(answer)}
                                        disabled={!!selectedAnswer}
                                    >
                                        {answer.text}
                                        {showAnswer && answer.isCorrect && 
                                            <span className="ms-2">✓</span>
                                        }
                                    </button>
                                </div>
                                {question.answers[index + 1] && (
                                    <div className="col-6">
                                        <button
                                            className={`btn btn-lg w-100 ${colors[(index + 1) % colors.length]} ${
                                                showAnswer && question.answers[index + 1].isCorrect ? 'border-success border-3' : ''
                                            } ${selectedAnswer === question.answers[index + 1] ? 'opacity-75' : ''}`}
                                            onClick={() => handleAnswerClick(question.answers[index + 1])}
                                            disabled={!!selectedAnswer}
                                        >
                                            {question.answers[index + 1].text}
                                            {showAnswer && question.answers[index + 1].isCorrect && 
                                                <span className="ms-2">✓</span>
                                            }
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {showAnswer && (
                <button 
                    className="btn btn-primary btn-lg mt-4"
                    onClick={onNext}
                >
                    Next Question
                </button>
            )}
        </div>
    );
};

export default QuestionComponent;
