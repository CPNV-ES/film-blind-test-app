import { ApiService } from './api.service';
import { GameParty, GamePartyAnswer, GamePartyResult } from '../models/GameParty';
import { Question } from '../models/Question';

export class GamePartyService {
    private gameParty: GameParty | null = null;
    private answers: GamePartyAnswer[] = [];
    private lastScore: number = 0;

    async startNewGame(userId: number, questionCount: number): Promise<void> {
        const questions = await this.getRandomQuestions(questionCount);
        this.gameParty = {
            id: Date.now(),
            userId,
            questions,
            currentQuestionIndex: 0,
            score: 0,
            startTime: new Date(),
            endTime: null,
        };
    }

    async getRandomQuestions(count: number): Promise<Question[]> {
        const questions: Question[] = [];
        for (let i = 0; i < count; i++) {
            const question = await ApiService.getRandomQuestion();
            questions.push(question);
        }
        return questions;
    }

    getCurrentQuestion(): Question | null {
        if (!this.gameParty) {
            return null;
        }
        return this.gameParty.questions[this.gameParty.currentQuestionIndex];
    }

    async answerCurrentQuestion(answerId: number): Promise<boolean> {
        if (!this.gameParty) {
            throw new Error('Aucune partie en cours');
        }

        const question = this.getCurrentQuestion();
        if (!question) {
            throw new Error('Aucune question en cours');
        }

        const answerTime = new Date().getTime() - this.gameParty.startTime.getTime();
        const answer = await ApiService.getQuestionAnswer(question.id);
        const isCorrect = answer.answer.id === answerId;

        // Enregistrer la réponse
        const gamePartyAnswer: GamePartyAnswer = {
            questionId: question.id,
            answerId: answerId,
            answerTime: answerTime
        };
        this.answers.push(gamePartyAnswer);

        if (isCorrect) {
            this.gameParty.score += this.calculateScore(answerTime);
        }

        this.gameParty.currentQuestionIndex++;

        if (this.gameParty.currentQuestionIndex === this.gameParty.questions.length) {
            await this.endGame();
        }

        return isCorrect;
    }

    private calculateScore(answerTime: number): number {
        // Logique pour calculer le score en fonction du temps de réponse
        // Par exemple : 
        const baseScore = 100;
        const timeLimit = 10000; // 10 secondes

        if (answerTime < timeLimit) {
            return baseScore;
        } else {
            const timeDiff = answerTime - timeLimit;
            const penalty = Math.floor(timeDiff / 1000) * 10;
            return Math.max(baseScore - penalty, 0);
        }
    }

    private async endGame(): Promise<GamePartyResult> {
        if (!this.gameParty) {
            throw new Error('Aucune partie en cours');
        }

        this.gameParty.endTime = new Date();

        const result: GamePartyResult = {
            gamePartyId: this.gameParty.id,
            totalScore: this.gameParty.score,
            totalTime: this.gameParty.endTime.getTime() - this.gameParty.startTime.getTime(),
        };

        await ApiService.submitScore({
            userId: this.gameParty.userId,
            score: result.totalScore,
        });

        this.lastScore = result.totalScore;
        this.gameParty = null;
        return result;
    }
    
    public getScore(): number {
        return this.lastScore;
    }
} 