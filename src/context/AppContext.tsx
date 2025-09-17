// app/context/AppContext.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchRickAndMortyCharactersAPI, simulateLogin } from '../services/api'; // Updated imports
import { AppContextType, Character } from '../types/types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};

interface AppProviderProps {
	children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const router = useRouter();

	// Authentication State
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [authToken, setAuthToken] = useState<string | null>(null);
	const [authLoading, setAuthLoading] = useState<boolean>(false);
	const [authError, setAuthError] = useState<string | null>(null);

	// Character State
	const [characters, setCharacters] = useState<Character[]>([]);
	const [charactersLoading, setCharactersLoading] = useState<boolean>(false);
	const [charactersError, setCharactersError] = useState<string | null>(null);

	// Login Function
	const login = useCallback(
		async (username: string, password: string): Promise<boolean> => {
			setAuthLoading(true);
			setAuthError(null);
			try {
				const response = await simulateLogin(username, password); // Call backend login API
				if (response.success && response.token) {
					localStorage.setItem('authToken', response.token);
					setIsAuthenticated(true);
					setAuthToken(response.token);
					setAuthLoading(false);
					router.push('/characters'); // Redirect on successful login
					return true;
				} else {
					setAuthError(response.message || 'Login failed');
					setIsAuthenticated(false);
					setAuthToken(null);
					setAuthLoading(false);
					return false;
				}
			} catch (error: unknown) {
				let errorMessage = 'Login failed due to an unexpected error.';
				if (error instanceof Error) {
					errorMessage = error.message;
				}
				setAuthError(errorMessage);
				setIsAuthenticated(false);
				setAuthToken(null);
				setAuthLoading(false);
				return false;
			}
		},
		[router]
	);

	// Logout Function
	const logout = useCallback(() => {
		localStorage.removeItem('authToken');
		setIsAuthenticated(false);
		setAuthToken(null);
		setAuthError(null);
		setCharacters([]); // Clear characters on logout
		setCharactersError(null);
		setCharactersLoading(false);
		router.push('/(auth)'); // Redirect to login page after logout
	}, [router]);

	// Fetch Characters Function
	const fetchCharacters = useCallback(async () => {
		setCharactersLoading(true);
		setCharactersError(null);
		try {
			const fetchedCharacters = await fetchRickAndMortyCharactersAPI(); // Call backend characters API
			setCharacters(fetchedCharacters);
			setCharactersLoading(false);
		} catch (error: unknown) {
			let errorMessage = 'Failed to fetch characters';
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			setCharactersError(errorMessage);
			setCharactersLoading(false);
		}
	}, []);

	// Initial check for authentication token on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('authToken');
			if (token) {
				setIsAuthenticated(true);
				setAuthToken(token);
				// Do not redirect here, let the page component handle initial routing
			}
		}
	}, []);

	// Context value
	const appContextValue: AppContextType = {
		auth: {
			isAuthenticated,
			token: authToken,
			loading: authLoading,
			error: authError,
			login,
			logout,
		},
		characters,
		charactersLoading,
		charactersError,
		fetchCharacters,
	};

	return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};
