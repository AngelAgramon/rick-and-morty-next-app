// app/components/CharacterGrid.tsx

import React from 'react';
import { CharacterGridProps } from '../types';
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
