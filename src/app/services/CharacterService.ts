// services/CharacterService.ts
import axios, { AxiosInstance } from 'axios';
import { Character, CharacterApiResponse } from '../models';

interface PaginationResponse {
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

export class CharacterService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor para agregar token a las requests
    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar respuestas de error
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  async getCharacters(): Promise<Character[]> {
    try {
      const response = await this.apiClient.get('/characters');
      
      // Manejar la nueva estructura de respuesta del backend optimizado
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // Fallback para la estructura antigua
      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      
      console.warn('Unexpected response structure:', response.data);
      return [];
    } catch (error: any) {
      console.error('Error in getCharacters:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener personajes');
    }
  }

  async getCharactersWithPagination(page: number = 1, pageSize: number = 21): Promise<PaginationResponse> {
    try {
      const url = `/characters?page=${page}&pageSize=${pageSize}`;
      console.log('📡 [CharacterService] Making request to:', url);
      
      const response = await this.apiClient.get(url);
      console.log('📡 [CharacterService] Raw response:', response.data);
      
      // Verificar que la respuesta tenga la estructura esperada
      if (response.data && response.data.data && response.data.pagination) {
        console.log('✅ [CharacterService] Valid response structure:', {
          dataLength: response.data.data.length,
          pagination: response.data.pagination
        });
        return {
          data: response.data.data,
          pagination: response.data.pagination
        };
      }
      
      console.warn('❌ [CharacterService] Unexpected pagination response structure:', response.data);
      return {
        data: [],
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      };
    } catch (error: any) {
      console.error('❌ [CharacterService] Error in getCharactersWithPagination:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener personajes con paginación');
    }
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await this.apiClient.get<Character>(`/characters/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener el personaje');
    }
  }

  async searchCharacters(name: string): Promise<Character[]> {
    try {
      const response = await this.apiClient.get(
        `/characters/search?name=${encodeURIComponent(name)}`
      );
      
      // Manejar la nueva estructura de respuesta del backend optimizado
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // Fallback para la estructura antigua
      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      
      console.warn('Unexpected search response structure:', response.data);
      return [];
    } catch (error: any) {
      console.error('Error in searchCharacters:', error);
      throw new Error(error.response?.data?.message || 'Error al buscar personajes');
    }
  }

  async getCharactersByStatus(status: string): Promise<Character[]> {
    try {
      const response = await this.apiClient.get<CharacterApiResponse>(
        `/characters/status/${status}`
      );
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener personajes por estado');
    }
  }

  async getCharactersBySpecies(species: string): Promise<Character[]> {
    try {
      const response = await this.apiClient.get<CharacterApiResponse>(
        `/characters/species/${species}`
      );
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener personajes por especie');
    }
  }

  async getCharactersWithFilters(filters: {
    name?: string;
    status?: string;
    species?: string;
    page?: number;
  }): Promise<CharacterApiResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.name) params.append('name', filters.name);
      if (filters.status) params.append('status', filters.status);
      if (filters.species) params.append('species', filters.species);
      if (filters.page) params.append('page', filters.page.toString());

      const response = await this.apiClient.get<CharacterApiResponse>(
        `/characters/filter?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al filtrar personajes');
    }
  }
}
