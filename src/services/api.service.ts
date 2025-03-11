import axios from 'axios';
import { Question, QuestionResponse } from '../models/Question';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/Auth';
import { Score, ScoreSubmission } from '../models/Score';

const API_URL = import.meta.env.VITE_API_URL;

export class ApiService {
    private static token: string | null = null;

    private static getHeaders() {
        return {
            Authorization: this.token ? `Bearer ${this.token}` : '',
        };
    }

    // Auth endpoints
    static async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        return response.data;
    }

    static async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        this.token = response.data.token;
        return response.data;
    }

    static async logout(): Promise<void> {
        await axios.post(`${API_URL}/auth/logout`, {}, { headers: this.getHeaders() });
        this.token = null;
    }

    // Question endpoints
    static async getRandomQuestion(): Promise<Question> {
        const response = await axios.get(`${API_URL}/question`);
        return response.data;
    }

    static async getQuestionAnswer(id: number): Promise<QuestionResponse> {
        const response = await axios.get(`${API_URL}/question/${id}`);
        return response.data;
    }

    // Score endpoints
    static async getLeaderboard(limit: number): Promise<Score[]> {
        const response = await axios.get(`${API_URL}/scores?limit=${limit}`);
        return response.data;
    }

    static async submitScore(data: ScoreSubmission): Promise<void> {
        await axios.post(`${API_URL}/scoreboard/score`, data, {
            headers: this.getHeaders(),
        });
    }
} 