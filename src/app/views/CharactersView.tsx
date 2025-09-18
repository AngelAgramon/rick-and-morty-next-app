// app/characters/page.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component
import { useNavigate } from "@remix-run/react";
import React, { useEffect } from 'react';
import CharacterGrid from '../../../app/components/CharacterGrid';
import Layout from '../../../app/components/Layout';
// import loadingGif from '../../../public/loading.gif';
import { authController, characterController } from '../../controllers';
import { observer } from "mobx-react-lite"

const CharactersView: React.FC = observer (() => {
	const navigate = useNavigate();
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
				navigate('/'); 
			} else if (!isAuthenticated && token) {
			}
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated && characters.length === 0 && !getIsLoading && !getIsError) {
			fetchCharacters();
		}
	}, [isAuthenticated, characters.length, fetchCharacters, getIsLoading, getIsError]);

	const handleLogout = () => {
		logout();
		navigate('/'); 
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
				{/* <img src={loadingGif.src} /> */}
            </> }
			{getIsError && <p className='error-message'>Error: {getIsError}</p>}
			{!getIsLoading && !getIsError && <CharacterGrid characters={characters} />}
		</Layout>
	);
});

export default CharactersView;