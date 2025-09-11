// app/components/CharacterCard.tsx

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useCharacterStore } from '../stores/StoreContext';
import { CharacterCardProps } from '../types';

const CharacterCard: React.FC<CharacterCardProps> = observer(({ character }) => {
	const characterStore = useCharacterStore();
	const isFavorite = characterStore.isFavorite(character.id);

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.onerror = null;
		target.src = `https://placehold.co/200x200/4B5563/FFFFFF?text=${character.name.substring(0, 1)}`;
	};

	return (
		<div className='character-card'>
			<div className="relative">
				<img src={character.image} alt={character.name} onError={handleImageError} />
				<button
					onClick={() => characterStore.toggleFavorite(character)}
					className={`favorite-btn ${isFavorite ? 'active' : ''}`}
					title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
				>
					{isFavorite ? '❤️' : '🤍'}
				</button>
			</div>
			<div className='character-card-content'>
				<h3 className="text-xl font-bold mb-3">{character.name}</h3>
				<div className="space-y-2">
					<p className="flex items-center space-x-2">
						<span className="text-blue-400 font-semibold">⚡</span>
						<span className="text-gray-300">Estado: <span className="text-blue-400 font-semibold">{character.status}</span></span>
					</p>
					<p className="flex items-center space-x-2">
						<span className="text-green-400 font-semibold">🧬</span>
						<span className="text-gray-300">Especie: <span className="text-green-400 font-semibold">{character.species}</span></span>
					</p>
					<p className="flex items-center space-x-2">
						<span className="text-purple-400 font-semibold">👤</span>
						<span className="text-gray-300">Género: <span className="text-purple-400 font-semibold">{character.gender}</span></span>
					</p>
					<p className="flex items-center space-x-2">
						<span className="text-cyan-400 font-semibold">🌍</span>
						<span className="text-gray-300">Origen: <span className="text-cyan-400 font-semibold">{character.origin.name}</span></span>
					</p>
				</div>
			</div>
		</div>
	);
});

export default CharacterCard;
