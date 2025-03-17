export interface Question {
    id: number;
    answers: Answer[];
    videoId: string;
}

export interface Answer {
    id: number;
    text: string;
}

export interface MovieInfo {
    title: string;
    description: string;
    poster: string;
    rating: number;
    url: string;
    year: number;
}

export interface QuestionResponse {
    answer: Answer;
    movieInfo: MovieInfo;
}
