import { Question } from './Question';

export interface GameParty {
    id: number;
    userId: number;
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    startTime: Date;
    endTime: Date | null;
}

export interface GamePartyAnswer {
    questionId: number;
    answerId: number;
    answerTime: number;
}

export interface GamePartyResult {
    gamePartyId: number;
    totalScore: number;
    totalTime: number;
} 