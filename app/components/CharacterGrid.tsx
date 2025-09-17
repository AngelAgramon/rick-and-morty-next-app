// app/components/CharacterGrid.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import React from 'react';
import { CharacterGridProps } from '../../types/types';
import CharacterCard from './CharacterCard';

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
	if (!characters || characters.length === 0) {
		return <p className='info-message'>No characters to display.</p>;
	}
	return (
		<div className='character-grid'>
			{characters.map(character => (
				<CharacterCard key={character.id} character={character} />
			))}
		</div>
	);
};

export default CharacterGrid;
