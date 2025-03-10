import {useParams} from "react-router-dom";

const Quiz = () => {

    const { quizId } = useParams<{ quizId: string }>(); // Récupère l'ID

    return (
        <div>
            <h1>À {quizId}</h1>
        </div>
    );
};

export default Quiz;
