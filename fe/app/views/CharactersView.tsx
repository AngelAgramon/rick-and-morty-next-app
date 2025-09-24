import { useNavigate } from "@remix-run/react";
import { useState } from "react";

import { authController, characterController, userController } from '../controllers';
import { observer } from "mobx-react-lite"
import CharacterGrid from '../components/CharacterGrid';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { characterModel } from "~/models";
import UserModal from "../components/userModal";

const CharactersView: React.FC = observer (() => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { 
		_characters: characters 
	} = characterController;
	const {
		isLoading: getIsLoading,
		isError: getIsError,
		errorMessage: getErrorMessage
	} = characterModel
 
	const handleLogout = () => {
		authController.logout();
		characterController.cleanup();
		navigate("/");
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<Layout>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '-webkit-fill-available', paddingLeft: '20px', paddingRight: '20px' }}>
				<button className='btn-primary btn-user' onClick={() => navigate("/users")}>Users</button>
				<button className='btn-primary btn-user' onClick={() => navigate("/characters")}>Characters</button>
				<h1 className='page-heading text-gradient teal-cyan rickFont'>Rick and Morty Characters</h1>
				<button onClick={handleLogout} className='btn-logout '>
					Logout
				</button>
			</div>
			<UserModal isOpen={isModalOpen} onClose={closeModal} />
			{getIsLoading && <Loading message="Cargando personajes..." size="large" />}
			{getIsError && <p className='error-message'>Error: {getErrorMessage}</p>}
			{!getIsError && !getIsLoading && <CharacterGrid characters={characters} />}
		</Layout>
	);
});

export default CharactersView;