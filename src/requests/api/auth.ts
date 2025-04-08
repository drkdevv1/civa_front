import { AUTH_URL } from '../apiConfig';

export const AUTH_ENDPOINTS = {
    login: `${AUTH_URL}/login`,
    register: `${AUTH_URL}/register`,
};

// Funciones específicas para autenticación
export const loginUser = async (username: string, password: string) => {
    const response = await fetch(AUTH_ENDPOINTS.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
};

export const registerUser = async (userData: {
    username: string;
    email: string;
    nombreCompleto: string;
    password: string;
}) => {
    const response = await fetch(AUTH_ENDPOINTS.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return await response.json();
};