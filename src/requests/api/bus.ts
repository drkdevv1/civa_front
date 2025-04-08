import { API_URL, fetchWithAuth } from '../apiConfig';

export const BUS_ENDPOINTS = {
    list: `${API_URL}/bus`,
    details: (id: number) => `${API_URL}/bus/${id}`,
};

// Funciones específicas para buses
export const getBuses = async (page: number = 0) => {
    return fetchWithAuth(`${BUS_ENDPOINTS.list}?page=${page}`);
};

export const getBusDetails = async (id: number) => {
    return fetchWithAuth(BUS_ENDPOINTS.details(id));
};