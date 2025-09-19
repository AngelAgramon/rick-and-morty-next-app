import { useNavigate } from "@remix-run/react";
import React, { useEffect } from 'react';

import { authController, characterController } from '../controllers';
import { observer } from "mobx-react-lite"
import CharacterGrid from '../components/CharacterGrid';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

const CharactersView: React.FC = observer (() => {
	const navigate = useNavigate();
	const {isLoggedIn: getIsLoggedIn, logout} = authController;
	const isAuthenticated = getIsLoggedIn;	
	const { fetchCharacters, characters: getcharacters, isError: getIsError, isLoading: getIsLoading } = characterController;
	const characters = getcharacters

	useEffect(() => {
		// Client-side authentication check
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('authToken');
			if (!isAuthenticated && !token) {
				console.log("ok")
				navigate('/'); 
			} else if (!isAuthenticated && token) {
			}
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated && characters.length === 0 && !getIsError && !getIsLoading) {
			fetchCharacters();
		}
	}, [isAuthenticated, characters.length, fetchCharacters, getIsError, getIsLoading]);

	const handleLogout = async () => {
		navigate('/'); 
		await logout();
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

			{getIsLoading && <Loading message="Cargando personajes..." size="large" />}
			{getIsError && <p className='error-message'>Error: {getIsError}</p>}
			{!getIsError && !getIsLoading && <CharacterGrid characters={characters} />}
		</Layout>
	);
});

export default CharactersView;