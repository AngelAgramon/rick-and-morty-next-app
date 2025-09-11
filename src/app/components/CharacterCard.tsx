// app/components/CharacterCard.tsx

import React from 'react';
import { useCharacter } from '../context/MVCContext';
import { CharacterCardProps } from '../types';

interface ExtendedCharacterCardProps extends CharacterCardProps {
	onToggleFavorite?: (character: any) => void;
}

const CharacterCard: React.FC<ExtendedCharacterCardProps> = ({ character: characterData, onToggleFavorite }) => {
	const character = useCharacter();
	const isFavorite = character.isFavorite(characterData.id);

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.onerror = null;
		target.src = `https://placehold.co/200x200/4B5563/FFFFFF?text=${characterData.name.substring(0, 1)}`;
	};

	return (
		<div style={{
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
			<div style={{ position: 'relative' }}>
				<img 
					src={characterData.image} 
					alt={characterData.name} 
					onError={handleImageError}
					style={{
						width: '100%',
						height: '200px',
						objectFit: 'cover',
						objectPosition: 'center'
					}}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						console.log('🔄 [CharacterCard] Heart clicked for:', characterData.name);
						console.log('🔄 [CharacterCard] Current isFavorite:', isFavorite);
						if (onToggleFavorite) {
							onToggleFavorite(characterData);
						} else {
							character.toggleFavorite(characterData);
						}
					}}
					style={{
						position: 'absolute',
						top: '12px',
						right: '12px',
						width: '44px',
						height: '44px',
						borderRadius: '50%',
						backgroundColor: isFavorite ? '#dc2626' : 'rgba(0, 0, 0, 0.9)',
						border: isFavorite ? 'none' : '2px solid #dc2626',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '20px',
						cursor: 'pointer',
						transition: 'all 0.3s ease',
						zIndex: 10,
						boxShadow: isFavorite 
							? '0 4px 12px rgba(220, 38, 38, 0.4)' 
							: '0 2px 8px rgba(0, 0, 0, 0.5)',
						outline: 'none'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.15)';
						e.currentTarget.style.boxShadow = isFavorite 
							? '0 6px 16px rgba(220, 38, 38, 0.6)' 
							: '0 4px 12px rgba(220, 38, 38, 0.3)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
						e.currentTarget.style.boxShadow = isFavorite 
							? '0 4px 12px rgba(220, 38, 38, 0.4)' 
							: '0 2px 8px rgba(0, 0, 0, 0.5)';
					}}
					title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
				>
					{isFavorite ? '❤️' : '🤍'}
				</button>
			</div>
			<div style={{ padding: '20px' }}>
				<h3 style={{
					fontSize: '20px',
					fontWeight: 'bold',
					marginBottom: '12px',
					color: '#f8fafc',
					margin: '0 0 12px 0'
				}}>{characterData.name}</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#60a5fa', fontWeight: '600' }}>⚡</span>
						<span style={{ color: '#d1d5db' }}>Estado: <span style={{ color: '#60a5fa', fontWeight: '600' }}>{characterData.status}</span></span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#34d399', fontWeight: '600' }}>🧬</span>
						<span style={{ color: '#d1d5db' }}>Especie: <span style={{ color: '#34d399', fontWeight: '600' }}>{characterData.species}</span></span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#a78bfa', fontWeight: '600' }}>👤</span>
						<span style={{ color: '#d1d5db' }}>Género: <span style={{ color: '#a78bfa', fontWeight: '600' }}>{characterData.gender}</span></span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
						<span style={{ color: '#22d3ee', fontWeight: '600' }}>🌍</span>
						<span style={{ color: '#d1d5db' }}>Origen: <span style={{ color: '#22d3ee', fontWeight: '600' }}>{characterData.origin.name}</span></span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
