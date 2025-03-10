import { useParams, useNavigate } from "react-router-dom";
import QuestionComponent from "../components/Question.tsx";
import { Question } from "../models/Question.ts";
import { useState, useEffect } from "react";

const Quiz = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ questionId: number, answer: string, time: number }[]>([]);
    const [startTime, setStartTime] = useState<number>(0);

    // Mock questions - In a real app, this would come from an API
    useEffect(() => {
        const mockQuestions: Question[] = [
            {
                id: 1,
                answers: [
                    { id: 1, text: 'Star Wars', isCorrect: true },
                    { id: 2, text: 'Indiana Jones', isCorrect: false },
                    { id: 3, text: 'Jurassic Park', isCorrect: false },
                    { id: 4, text: 'Harry Potter', isCorrect: false },
                ],
                videoId: 'dQw4w9WgXcQ',
            },
            {
                id: 2,
                answers: [
                    { id: 1, text: 'The Lion King', isCorrect: true },
                    { id: 2, text: 'Aladdin', isCorrect: false },
                    { id: 3, text: 'Frozen', isCorrect: false },
                    { id: 4, text: 'Moana', isCorrect: false },
                ],
                videoId: 'GibiNy4d4gc',
            },
            // Add more questions as needed
        ];
        setQuestions(mockQuestions.slice(0, Number(quizId)));
        setStartTime(Date.now());
    }, [quizId]);

    const handleAnswer = (answer: string) => {
        const timeSpent = (Date.now() - startTime) / 1000; // Convert to seconds
        setAnswers([...answers, {
            questionId: questions[currentQuestionIndex].id,
            answer,
            time: timeSpent
        }]);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setStartTime(Date.now());
        } else {
            navigate('/quiz-summary', {
                state: { 
                    answers,
                    totalQuestions: questions.length
                }
            });
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-center h-100">
            <div className="mb-4">
                <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
            </div>
            <QuestionComponent 
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                onNext={handleNext}
            />
        </div>
    );
};

export default Quiz;
