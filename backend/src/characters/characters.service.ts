import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CustomPaginationResponse {
  data: Character[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

@Injectable()
export class CharactersService {
  private readonly rickAndMortyApiUrl = 'https://rickandmortyapi.com/api';

  async getAllCharacters(page?: number): Promise<CharacterApiResponse> {
    try {
      // Cambiar aquí el número de página por defecto (ejemplo: página 2)
      const defaultPage = 1;
      const pageToUse = page || defaultPage;
      const url = `${this.rickAndMortyApiUrl}/character?page=${pageToUse}`;
      
      const response = await axios.get<CharacterApiResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener personajes de Rick and Morty');
    }
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await axios.get<Character>(`${this.rickAndMortyApiUrl}/character/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener el personaje con ID ${id}`);
    }
  }

  async searchCharacters(name: string): Promise<CharacterApiResponse> {
    try {
      const response = await axios.get<CharacterApiResponse>(
        `${this.rickAndMortyApiUrl}/character?name=${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error al buscar personajes con nombre: ${name}`);
    }
  }

  async getAllCharactersWithPagination(page: number = 1, pageSize: number = 21): Promise<CustomPaginationResponse> {
    try {
      // Calculamos qué páginas de la API original necesitamos
      const apiPageSize = 20; // La API original usa 20 por página
      const startCharacterIndex = (page - 1) * pageSize;
      const endCharacterIndex = startCharacterIndex + pageSize;
      
      // Calculamos las páginas de la API que necesitamos
      const startApiPage = Math.floor(startCharacterIndex / apiPageSize) + 1;
      const endApiPage = Math.floor((endCharacterIndex - 1) / apiPageSize) + 1;
      
      const allCharacters: Character[] = [];
      
      // Obtenemos solo las páginas necesarias de la API
      for (let apiPage = startApiPage; apiPage <= endApiPage; apiPage++) {
        const response = await axios.get<CharacterApiResponse>(
          `${this.rickAndMortyApiUrl}/character?page=${apiPage}`,
          { timeout: 10000 } // 10 segundos de timeout
        );
        allCharacters.push(...response.data.results);
      }
      
      // Aplicamos el slice para obtener exactamente los personajes que necesitamos
      const startIndex = startCharacterIndex % apiPageSize;
      const endIndex = startIndex + pageSize;
      const paginatedCharacters = allCharacters.slice(startIndex, endIndex);
      
      // Obtenemos el total de personajes de la primera página
      const firstResponse = await axios.get<CharacterApiResponse>(
        `${this.rickAndMortyApiUrl}/character?page=1`,
        { timeout: 10000 } // 10 segundos de timeout
      );
      const totalItems = firstResponse.data.info.count;
      const totalPagesCustom = Math.ceil(totalItems / pageSize);

      return {
        data: paginatedCharacters,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: totalItems,
          totalPages: totalPagesCustom,
          hasNextPage: page < totalPagesCustom,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      console.error('Error en getAllCharactersWithPagination:', error);
      throw new Error('Error al obtener personajes con paginación personalizada');
    }
  }

  // Método alternativo más simple y rápido
  async getAllCharactersSimple(page: number = 1, pageSize: number = 21): Promise<CustomPaginationResponse> {
    try {
      console.log(`🔄 [Backend] getAllCharactersSimple called with page: ${page}, pageSize: ${pageSize}`);
      
      // Para simplificar, vamos a obtener múltiples páginas de la API si es necesario
      const allCharacters: Character[] = [];
      let totalItems = 0;
      
      // Primero obtenemos la primera página para saber el total
      const firstResponse = await axios.get<CharacterApiResponse>(
        `${this.rickAndMortyApiUrl}/character?page=1`,
        { timeout: 10000 }
      );
      
      totalItems = firstResponse.data.info.count;
      allCharacters.push(...firstResponse.data.results);
      
      // Calculamos cuántas páginas necesitamos obtener
      const totalApiPages = firstResponse.data.info.pages;
      const maxCharactersNeeded = page * pageSize;
      const maxApiPagesNeeded = Math.min(totalApiPages, Math.ceil(maxCharactersNeeded / 20));
      
      console.log(`📊 [Backend] Total items: ${totalItems}, API pages: ${totalApiPages}, Max needed: ${maxApiPagesNeeded}`);
      
      // Obtenemos las páginas adicionales si es necesario
      for (let apiPage = 2; apiPage <= maxApiPagesNeeded; apiPage++) {
        const response = await axios.get<CharacterApiResponse>(
          `${this.rickAndMortyApiUrl}/character?page=${apiPage}`,
          { timeout: 10000 }
        );
        allCharacters.push(...response.data.results);
      }
      
      // Aplicamos paginación personalizada
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedCharacters = allCharacters.slice(startIndex, endIndex);
      
      const totalPages = Math.ceil(totalItems / pageSize);
      
      console.log(`✅ [Backend] Returning ${paginatedCharacters.length} characters for page ${page}`);
      
      return {
        data: paginatedCharacters,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: totalItems,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      console.error('❌ [Backend] Error en getAllCharactersSimple:', error);
      throw new Error('Error al obtener personajes');
    }
  }
}