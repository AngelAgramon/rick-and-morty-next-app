// app/services/api.ts
import axios from 'axios';
import { Character, CharacterApiResponse } from '../types';

interface LoginResponse {
	success: boolean;
	message?: string;
	token?: string;
}

export const simulateLogin = async (username: string, password: string): Promise<LoginResponse> => {
	// This function now calls our Next.js API route for login
	const response = await axios.post<LoginResponse>('/api/login', { username, password });
	return response.data;
};

export const fetchRickAndMortyCharactersAPI = async (): Promise<Character[]> => {
	// This function now calls our Next.js API route for characters
	const response = await axios.get<CharacterApiResponse>('/api/characters');
	return response.data.results;
};
