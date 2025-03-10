export interface Score {
    userId: number;
    username: string;
    score: number;
    date: Date;
}

export interface ScoreSubmission {
    score: number;
    userId: number;
}

export interface LeaderboardRequest {
    limit: number;
} 