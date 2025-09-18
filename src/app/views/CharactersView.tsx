// app/characters/page.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import React, { useEffect } from 'react';
import CharacterGrid from '../components/CharacterGrid';
import Layout from '../components/Layout';
import loadingGif from '../../assets/loading.gif';
import { authController, characterController } from '../../controllers';

const CharactersView: React.FC = () => {
	const router = useRouter();
	const {getIsLoggedIn, logout} = authController;
	const isAuthenticated = getIsLoggedIn;	
	const { fetchCharacters, getcharacters, getIsLoading, getIsError } = characterController;
	const characters = getcharacters

	useEffect(() => {
		console.log(isAuthenticated)
		// Client-side authentication check
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('authToken');
			if (!isAuthenticated && !token) {
				router.push('/'); 
			} else if (!isAuthenticated && token) {
			}
		}
	}, [isAuthenticated, router]);

	useEffect(() => {
		if (isAuthenticated && characters.length === 0 && !getIsLoading && !getIsError) {
			fetchCharacters();
		}
	}, [isAuthenticated, characters.length, fetchCharacters, getIsLoading, getIsError]);

	const handleLogout = () => {
		logout();
		router.push('/'); 
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

			{getIsLoading && 
            <>
                 <p className='loading-message rickFont'>Loading characters...</p>
				<img src={loadingGif.src} />
            </> }
			{getIsError && <p className='error-message'>Error: {getIsError}</p>}
			{!getIsLoading && !getIsError && <CharacterGrid characters={characters} />}
		</Layout>
	);
};

export default CharactersView;