// app/components/CharacterGrid.tsx

import React from 'react';
import { CharacterGridProps } from '../types';
import CharacterCard from './CharacterCard';

interface ExtendedCharacterGridProps extends CharacterGridProps {
	onToggleFavorite?: (character: any) => void;
}

const CharacterGrid: React.FC<ExtendedCharacterGridProps> = ({ characters, onToggleFavorite }) => {
	if (!characters || characters.length === 0) {
		return (
			<p style={{
				textAlign: 'center',
				color: '#94a3b8',
				fontSize: '18px',
				padding: '64px 0'
			}}>
				No characters to display.
			</p>
		);
	}
	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
			gap: '24px',
			padding: '0'
		}}>
			{characters.map(character => (
				<CharacterCard 
					key={character.id} 
					character={character} 
					onToggleFavorite={onToggleFavorite}
				/>
			))}
		</div>
	);
};

export default CharacterGrid;
