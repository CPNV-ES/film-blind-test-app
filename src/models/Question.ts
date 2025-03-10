export interface Question {
    id: number;
    answers: Answer[];
    videoId: string;
}

export interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
}

export interface MovieInfo {
    title: string;
    year: number;
    director: string;
    // Autres informations sur le film...
}

export interface QuestionResponse {
    answer: Answer;
    movieInfo: MovieInfo;
}
