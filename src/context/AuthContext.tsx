import {createContext, useContext, useState, ReactNode} from "react";
import { User } from "../models/Auth";
import { ApiService } from "../services/api.service";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (name: string, email: string) => Promise<void>;
    deleteAccount: () => Promise<void>;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            const response = await ApiService.login({ email, password });
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la connexion");
            throw err;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            setError(null);
            
            const response = await ApiService.register({ username: name, email, password });
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription");
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            
            await ApiService.logout();
            setUser(null);
            localStorage.removeItem("user");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la déconnexion");
            throw err;
        }
    };

    const updateProfile = async (name: string, email: string) => {
        try {
            setError(null);
            
            if (!user) throw new Error("Utilisateur non connecté");
            
            // TODO: Implement API call for profile update when available
            user.username = name;
            user.email = email;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la mise à jour du profil");
            throw err;
        }
    };

    const deleteAccount = async () => {
        try {
            setError(null);
            
            if (!user) throw new Error("Utilisateur non connecté");
            
            // TODO: Implement API call for account deletion when available
            setUser(null);
            localStorage.removeItem("user");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la suppression du compte");
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            updateProfile,
            deleteAccount,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
