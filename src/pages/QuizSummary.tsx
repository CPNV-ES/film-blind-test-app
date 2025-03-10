import { Link, useLocation } from "react-router-dom";

interface QuizSummaryState {
    answers: {
        questionId: number;
        answer: string;
        time: number;
    }[];
    totalQuestions: number;
}

const QuizSummary = () => {
    const location = useLocation();
    const { answers, totalQuestions } = location.state as QuizSummaryState;

    const totalTime = answers.reduce((acc, curr) => acc + curr.time, 0);
    const averageTime = totalTime / answers.length;

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Quiz Summary</h1>
            
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Overall Statistics</h5>
                    <p className="card-text">Total Questions: {totalQuestions}</p>
                    <p className="card-text">Total Time: {totalTime.toFixed(2)} seconds</p>
                    <p className="card-text">Average Time per Question: {averageTime.toFixed(2)} seconds</p>
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
                                Question {index + 1}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#answersAccordion"
                        >
                            <div className="accordion-body">
                                <p><strong>Your Answer:</strong> {answer.answer}</p>
                                <p><strong>Time Taken:</strong> {answer.time.toFixed(2)} seconds</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <Link to="/dashboard" className="btn btn-primary">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default QuizSummary;
