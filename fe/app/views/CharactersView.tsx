import { useNavigate } from "@remix-run/react";
import React, { useEffect } from 'react';

import { authController, characterController } from '../controllers';
import { observer } from "mobx-react-lite"
import CharacterGrid from '../components/CharacterGrid';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { characterModel } from "~/models";

const CharactersView: React.FC = observer (() => {
	const { 
		_characters: characters 
	} = characterController;
	const {
		_isLoading: getIsLoading,
		_isError: getIsError
	} = characterModel
 
	const handleLogout = () => {
		authController.logout();
	};

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