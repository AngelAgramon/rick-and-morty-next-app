// services/FavoritesService.ts
import axios, { AxiosInstance } from 'axios';
import { Character } from '../models';

export interface UserFavorite {
  id: number;
  userId: number;
  characterId: number;
  characterName: string;
  characterImage: string;
  addedAt: string;
}

export interface FavoritesResponse {
  favorites: UserFavorite[];
  total: number;
}

export interface CreateFavoriteDto {
  characterId: number;
  characterName: string;
  characterImage: string;
}

export class FavoritesService {
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

  async getUserFavorites(): Promise<Character[]> {
    try {
      const response = await this.apiClient.get<FavoritesResponse>('/favorites');
      
      // Convertir UserFavorite[] a Character[]
      const characters: Character[] = response.data.favorites.map(fav => ({
        id: fav.characterId,
        name: fav.characterName,
        status: '', // No tenemos esta info en favoritos
        species: '', // No tenemos esta info en favoritos
        type: '', // No tenemos esta info en favoritos
        gender: '', // No tenemos esta info en favoritos
        origin: { name: '', url: '' },
        location: { name: '', url: '' },
        image: fav.characterImage,
        episode: [],
        url: '',
        created: fav.addedAt
      }));

      return characters;
    } catch (error: any) {
      console.error('Error al obtener favoritos:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener favoritos');
    }
  }

  async addFavorite(character: Character): Promise<UserFavorite> {
    try {
      const createFavoriteDto: CreateFavoriteDto = {
        characterId: character.id,
        characterName: character.name,
        characterImage: character.image
      };

      const response = await this.apiClient.post<UserFavorite>('/favorites', createFavoriteDto);
      return response.data;
    } catch (error: any) {
      console.error('Error al agregar favorito:', error);
      throw new Error(error.response?.data?.message || 'Error al agregar favorito');
    }
  }

  async removeFavorite(characterId: number): Promise<void> {
    try {
      await this.apiClient.delete(`/favorites/${characterId}`);
    } catch (error: any) {
      console.error('Error al eliminar favorito:', error);
      throw new Error(error.response?.data?.message || 'Error al eliminar favorito');
    }
  }

  async isFavorite(characterId: number): Promise<boolean> {
    try {
      const response = await this.apiClient.get<{ isFavorite: boolean }>(`/favorites/check/${characterId}`);
      return response.data.isFavorite;
    } catch (error: any) {
      console.error('Error al verificar favorito:', error);
      return false;
    }
  }

  async getFavoriteByCharacterId(characterId: number): Promise<UserFavorite | null> {
    try {
      const response = await this.apiClient.get<UserFavorite>(`/favorites/character/${characterId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error al obtener favorito:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener favorito');
    }
  }
}