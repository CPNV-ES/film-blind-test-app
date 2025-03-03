import Scoreboard from "../components/Scoreboard.tsx";

const Dashboard = () => {
    return (
        <div>

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
