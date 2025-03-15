import Scoreboard from "../components/Scoreboard.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
    const [quizId, setQuizId] = useState<number>(10);
    const [activeTab, setActiveTab] = useState<"global" | "10" | "20" | "30">("global");

    return (
        <div className="container py-4">
            <h1 className="mb-4">Tableau de bord</h1>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h5 mb-0">Jouer au Blind Test</h2>
                        </div>
                        <div className="card-body">
                            <p>Choisissez le nombre de questions et commencez à jouer !</p>
                            <div className="d-flex align-items-center gap-3">
                                <select
                                    value={quizId}
                                    onChange={(e) => setQuizId(Number(e.target.value))}
                                    className="form-select"
                                >
                                    <option value={10}>10 questions</option>
                                    <option value={20}>20 questions</option>
                                    <option value={30}>30 questions</option>
                                </select>
                                
                                <Link className="btn btn-primary" to={"/quiz/" + quizId}>
                                    Jouer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === "global" ? "active" : ""}`}
                                onClick={() => setActiveTab("global")}
                            >
                                Global
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === "10" ? "active" : ""}`}
                                onClick={() => setActiveTab("10")}
                            >
                                10 questions
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === "20" ? "active" : ""}`}
                                onClick={() => setActiveTab("20")}
                            >
                                20 questions
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === "30" ? "active" : ""}`}
                                onClick={() => setActiveTab("30")}
                            >
                                30 questions
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <h2 className="h4 mb-4">Classement {activeTab !== "global" ? `- ${activeTab} questions` : ""}</h2>
                    <Scoreboard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
