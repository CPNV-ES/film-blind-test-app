import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {ApiService} from "../services/api.service.ts";
import {Score} from "../models/Score.ts";

interface ScoreboardProps {
    category?: "10" | "20" | "30";
    limit?: number;
}

const Scoreboard = ({ category, limit = 10 }: ScoreboardProps) => {
    const { user } = useAuth();
    const [scores, setScores] = useState<Score[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState<"score" | "date">("score");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        // Simulation de chargement des scores depuis une API
        const fetchScores = async () => {
            setIsLoading(true);

            const scores: Score[] = await ApiService.getLeaderboard(10);
            
            // TODO : Filter by category
            //let filteredScores = scores;
            //if (category) {
            //    filteredScores = scores.filter(score => score.category === parseInt(category));
            //}

            setScores(scores);
            setIsLoading(false);
        };
        
        fetchScores();
    }, [category]);

    const handleSort = (field: "score" | "date") => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder(field === "score" ? "desc" : "desc");
        }
    };

    const sortedScores = [...scores].sort((a, b) => {
        const multiplier = sortOrder === "asc" ? 1 : -1;
        
        if (sortBy === "score") {
            return (a.score - b.score) * multiplier;
        } else {
            return (new Date(a.date).getTime() - new Date(b.date).getTime()) * multiplier;
        }
    }).slice(0, limit);

    if (isLoading) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th 
                            scope="col" 
                            className="cursor-pointer"
                            onClick={() => handleSort("score")}
                        >
                            Points
                            {sortBy === "score" && (
                                <span className="ms-1">
                                    {sortOrder === "desc" ? "▼" : "▲"}
                                </span>
                            )}
                        </th>
                        <th scope="col">Utilisateur</th>
                        <th scope="col">Bonnes réponses</th>
                        <th 
                            scope="col"
                            className="cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            Date
                            {sortBy === "date" && (
                                <span className="ms-1">
                                    {sortOrder === "desc" ? "▼" : "▲"}
                                </span>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedScores.map((entry, index) => (
                        <tr 
                            key={entry.userId}
                            className={user && entry.userId === user.id ? "table-primary" : ""}
                        >
                            <td>{index + 1}</td>
                            <td>{entry.score}</td>
                            <td className="d-flex align-items-center">
                                {entry.username}
                            </td>
                            <td>{entry.score}</td>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    
                    {sortedScores.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                Aucun score disponible pour le moment
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Scoreboard;
