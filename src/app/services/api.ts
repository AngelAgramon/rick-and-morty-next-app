// app/services/api.ts
import axios from 'axios';
import { Character, CharacterApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3001';

// Configurar axios con interceptores para manejar tokens
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Interceptor para agregar token a las requests
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor para manejar respuestas de error
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('authToken');
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

interface LoginResponse {
	success: boolean;
	message?: string;
	token?: string;
	user?: {
		id: number;
		username: string;
	};
}

interface BackendLoginResponse {
	access_token: string;
	user: {
		id: number;
		username: string;
	};
}

export const simulateLogin = async (username: string, password: string): Promise<LoginResponse> => {
	try {
		const response = await apiClient.post<BackendLoginResponse>('/auth/login', {
			username,
			password,
		});

		// Guardar token en localStorage
		localStorage.setItem('authToken', response.data.access_token);

		return {
			success: true,
			message: 'Login successful',
			token: response.data.access_token,
			user: response.data.user,
		};
	} catch (error) {
		return {
			success: false,
			message: 'Invalid username or password',
		};
	}
};

export const fetchRickAndMortyCharactersAPI = async (): Promise<Character[]> => {
	try {
		const response = await apiClient.get<CharacterApiResponse>('/characters');
		return response.data.results;
	} catch (error) {
		throw new Error('Error al obtener personajes del backend');
	}
};

export const searchCharacters = async (name: string): Promise<Character[]> => {
	try {
		const response = await apiClient.get<CharacterApiResponse>(`/characters/search?name=${encodeURIComponent(name)}`);
		return response.data.results;
	} catch (error) {
		throw new Error('Error al buscar personajes');
	}
};

export const validateToken = async (): Promise<boolean> => {
	try {
		await apiClient.get('/auth/validate');
		return true;
	} catch (error) {
		return false;
	}
};
