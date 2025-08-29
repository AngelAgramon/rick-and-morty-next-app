// app/api/characters/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';
import { CharacterApiResponse } from '../../types'; // Adjust path as needed

export async function GET() {
	try {
		const response = await axios.get<CharacterApiResponse>('https://rickandmortyapi.com/api/character');
		return NextResponse.json(response.data);
	} catch (error) {
		return NextResponse.json({ message: 'Failed to fetch characters from external API', error: error.message }, { status: 500 });
	}
}
