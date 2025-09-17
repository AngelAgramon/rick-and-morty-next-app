// app/components/CharacterCard.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import React from 'react';
import { CharacterCardProps } from '../types';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.onerror = null;
		target.src = `https://placehold.co/200x200/4B5563/FFFFFF?text=${character.name.substring(0, 1)}`;
	};

	return (
		<div className='character-card'>
			<img src={character.image} alt={character.name} onError={handleImageError} />
			<div className='character-card-content'>
				<h3>{character.name}</h3>
				<p>
					<span>Status:</span> {character.status}
				</p>
				<p>
					<span>Species:</span> {character.species}
				</p>
				<p>
					<span>Gender:</span> {character.gender}
				</p>
				<p>
					<span>Origin:</span> {character.origin.name}
				</p>
			</div>
		</div>
	);
};

export default CharacterCard;
