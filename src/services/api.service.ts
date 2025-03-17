import axios from 'axios';
import { Question, QuestionResponse } from '../models/Question';
import {AuthResponse, LoginRequest, RegisterRequest, User} from '../models/Auth';
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
        this.token = response.data.token;
        if (this.token) localStorage.setItem("token", this.token);
        console.log()
        return response.data;
    }

    static async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        this.token = response.data.token;
        if (this.token) localStorage.setItem("token", this.token);
        return response.data;
    }

    static async logout(): Promise<void> {
        await axios.post(`${API_URL}/auth/logout`, {}, { headers: this.getHeaders() });
        this.token = null;
        localStorage.removeItem("token");
    }

    static async getCurrentUser(): Promise<User> {
        this.token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/user`, {
            headers: this.getHeaders()
        });
        return {id: 0, email : response.data.email, username : response.data.username};
    }

    static async updateUser(data: Partial<User>): Promise<User> {
        const response = await axios.put(`${API_URL}/user`, data, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    static async deleteUser(): Promise<void> {
        await axios.delete(`${API_URL}/user`, {
            headers: this.getHeaders()
        });
        this.token = null;
        localStorage.removeItem("token");
    }

    static async getRandomQuestion(): Promise<Question> {
        const response = await axios.get(`${API_URL}/question`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    static async getQuestionAnswer(id: number): Promise<QuestionResponse> {
        const response = await axios.get(`${API_URL}/question/${id}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    // Score endpoints
    static async getLeaderboard(limit: number): Promise<Score[]> {
        const response = await axios.get(`${API_URL}/scores?limit=${limit}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    static async submitScore(data: ScoreSubmission): Promise<void> {
        await axios.post(`${API_URL}/score`, data, {
            headers: this.getHeaders(),
        });
    }
} 