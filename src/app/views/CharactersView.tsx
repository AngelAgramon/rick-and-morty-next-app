// app/characters/page.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import React, { useEffect } from 'react';
import CharacterGrid from '../components/CharacterGrid';
import Layout from '../components/Layout';
import { useAppContext } from '../../context/AppContext';

import loadingGif from '../../assets/loading.gif';

const CharactersView: React.FC = () => {
	const { auth, characters, charactersLoading, charactersError, fetchCharacters } = useAppContext();
	const { isAuthenticated, logout } = auth;
	const router = useRouter();

	useEffect(() => {
		// Client-side authentication check
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('authToken');
			if (!isAuthenticated && !token) {
				router.push('/(auth)'); // Redirect to login if not authenticated
			} else if (!isAuthenticated && token) {
				// If token exists but Redux state not updated (e.g., page refresh), set isAuthenticated
				// This scenario is now handled by the AppProvider's initial useEffect if it was the old Redux.
				// With current Context, this check already happened in AppProvider.
				// If isAuthenticated is false despite a token, it means login wasn't successful or cleared.
			}
		}
	}, [isAuthenticated, router]);

	useEffect(() => {
		if (isAuthenticated && characters.length === 0 && !charactersLoading && !charactersError) {
			fetchCharacters();
		}
	}, [isAuthenticated, characters.length, fetchCharacters, charactersLoading, charactersError]);

	const handleLogout = () => {
		logout();
		router.push('/(auth)'); // Redirect to login page after logout
	};

	if (!isAuthenticated) {
		return (
			<Layout>
				<div className='redirect-message'>
					<p>Redirecting to login...</p>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '-webkit-fill-available', paddingLeft: '20px', paddingRight: '20px' }}>
				<h1 className='page-heading text-gradient teal-cyan rickFont'>Rick and Morty Characters</h1>
				<button onClick={handleLogout} className='btn-logout '>
					Logout
				</button>
			</div>

			{charactersLoading && 
            <>
                 <p className='loading-message rickFont'>Loading characters...</p>
				<img src={loadingGif.src} />
            </> }
			{charactersError && <p className='error-message'>Error: {charactersError}</p>}
			{!charactersLoading && !charactersError && <CharacterGrid characters={characters} />}
		</Layout>
	);
};

export default CharactersView;