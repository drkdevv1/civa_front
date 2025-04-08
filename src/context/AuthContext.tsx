import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { loginUser, registerUser } from '../requests/api/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, nombreCompleto: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username: string, email: string, nombreCompleto: string, password: string) => {
        try {
            const data = await registerUser({ username, email, nombreCompleto, password });
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};