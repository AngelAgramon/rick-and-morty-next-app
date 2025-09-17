// app/components/CharacterCard.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import React from 'react';
import { CharacterCardProps } from '../../types/types';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.onerror = null;
		target.src = `https://placehold.co/200x200/4B5563/FFFFFF?text=${character.name.substring(0, 1)}`;
	};

	return (
		<div  style={{
			backgroundColor: '#1e293b',
			borderRadius: '12px',
			overflow: 'hidden',
			boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
			transition: 'all 0.3s ease',
			border: '1px solid #334155'
		}}
		onMouseEnter={(e) => {
			e.currentTarget.style.transform = 'translateY(-4px)';
			e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)';
		}}
		onMouseLeave={(e) => {
			e.currentTarget.style.transform = 'translateY(0)';
			e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)';
		}}>

			<div >
				<img src={character.image} alt={character.name} onError={handleImageError} style={{borderRadius: '12px' }} />
				<h3 style={{
					fontSize: '20px',
					fontWeight: 'bold',
					marginBottom: '12px',
					color: '#f8fafc',
					margin: '0 0 12px 0',
					paddingLeft: '12px'
				}}>{character.name}</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px', paddingRight: '12px', paddingBottom: '12px'}}>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#60a5fa', fontWeight: '600' }}>⚡</span>
						<span style={{ color: '#d1d5db' }}>Estado: <span style={{ color: '#60a5fa', fontWeight: '600' }}>{character.status}</span></span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#34d399', fontWeight: '600' }}>🧬</span>
						<span style={{ color: '#d1d5db' }}>Especie: <span style={{ color: '#34d399', fontWeight: '600' }}>{character.species}</span></span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#a78bfa', fontWeight: '600' }}>👤</span>
						<span style={{ color: '#d1d5db' }}>Género: <span style={{ color: '#a78bfa', fontWeight: '600' }}>{character.gender}</span></span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#22d3ee', fontWeight: '600' }}>🌍</span>
						<span style={{ color: '#d1d5db' }}>Origen: <span style={{ color: '#22d3ee', fontWeight: '600' }}>{character.origin.name}</span></span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
