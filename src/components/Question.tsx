import {Answer, Question} from "../models/Question.ts";
import YouTube, {YouTubeProps} from "react-youtube";

interface QuestionComponentProps {
    question: Question;
    onAnswer: (answer: string) => void;
    onNext: () => void;
}

const QuestionComponent = ({ question, onAnswer }: QuestionComponentProps) => {
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

    const handleAnswerClick = (answer: Answer) => {
        onAnswer(answer.text);
    };

    return (
        <div className="d-flex flex-column align-items-center gap-4">
            <YouTube videoId={question.videoId} opts={opts} onReady={onPlayerReady} />
            <p className="fs-4">Une musique est en train de jouer.</p>

            <div className="container">
                <div className="row">
                    {question.answers.map((answer) => (
                        <div className="col-6 mb-3" key={answer.id}>
                            <button
                                className="btn btn-lg w-100 btn-primary"
                                onClick={() => handleAnswerClick(answer)}
                            >
                                {answer.text}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionComponent;
