import Scoreboard from "../components/Scoreboard.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";

const Dashboard = () => {

    const [quizId, setQuizId] = useState<number>(10);

    return (
        <div>

            <div className="position-relative overflow-hidden p-3 bg-body-tertiary mb-3 d-flex">
                <Link className="btn btn-primary mx-2" to={"/quiz/" + quizId}>
                    Jouer
                </Link>

                <select
                    value={quizId}
                    onChange={(e) => setQuizId(Number(e.target.value))}
                    className="form-select"
                >
                    <option value={10}>10 questions</option>
                    <option value={20}>20 questions</option>
                    <option value={30}>30 questions</option>
                </select>
            </div>

            <div className="position-relative overflow-hidden p-3 bg-body-tertiary mb-3">
                <div className="table-responsive small">
                    <h1 className="text-center">
                        Global
                    </h1>
                    <Scoreboard></Scoreboard>
                </div>
            </div>


            <div className="position-relative overflow-hidden p-3 mb-3">

                <div className="table-responsive small">
                    <h2>
                        10 questions
                    </h2>
                    <Scoreboard></Scoreboard>

                </div>

                <div className="table-responsive small">
                    <h2>
                        20 questions
                    </h2>
                    <Scoreboard></Scoreboard>

                </div>

                <div className="table-responsive small">
                    <h2>
                        30 questions
                    </h2>
                    <Scoreboard></Scoreboard>

                </div>
            </div>




        </div>
    );
};

export default Dashboard;
