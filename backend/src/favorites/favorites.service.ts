import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserFavorite, CreateFavoriteDto, FavoritesResponse } from './favorites.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FavoritesService {
  private readonly dataFilePath = path.join(process.cwd(), 'data', 'favorites.json');
  private favorites: UserFavorite[] = [];
  private nextId = 1;

  constructor() {
    this.loadFavoritesFromFile();
  }

  private loadFavoritesFromFile(): void {
    try {
      // Crear directorio si no existe
      const dataDir = path.dirname(this.dataFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Cargar datos del archivo si existe
      if (fs.existsSync(this.dataFilePath)) {
        const fileContent = fs.readFileSync(this.dataFilePath, 'utf8');
        const data = JSON.parse(fileContent);
        this.favorites = data.favorites || [];
        this.nextId = data.nextId || 1;
        console.log(`✅ [FavoritesService] Loaded ${this.favorites.length} favorites from file`);
      } else {
        console.log('📝 [FavoritesService] No favorites file found, starting with empty data');
      }
    } catch (error) {
      console.error('❌ [FavoritesService] Error loading favorites from file:', error);
      this.favorites = [];
      this.nextId = 1;
    }
  }

  private saveFavoritesToFile(): void {
    try {
      const data = {
        favorites: this.favorites,
        nextId: this.nextId,
        lastUpdated: new Date().toISOString()
      };
      
      fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2));
      console.log(`💾 [FavoritesService] Saved ${this.favorites.length} favorites to file`);
    } catch (error) {
      console.error('❌ [FavoritesService] Error saving favorites to file:', error);
    }
  }

  async getUserFavorites(userId: number): Promise<FavoritesResponse> {
    const userFavorites = this.favorites.filter(fav => fav.userId === userId);
    return {
      favorites: userFavorites,
      total: userFavorites.length
    };
  }

  async addFavorite(userId: number, createFavoriteDto: CreateFavoriteDto): Promise<UserFavorite> {
    // Verificar si el personaje ya está en favoritos
    const existingFavorite = this.favorites.find(
      fav => fav.userId === userId && fav.characterId === createFavoriteDto.characterId
    );

    if (existingFavorite) {
      throw new ConflictException('El personaje ya está en tus favoritos');
    }

    const newFavorite: UserFavorite = {
      id: this.nextId++,
      userId,
      characterId: createFavoriteDto.characterId,
      characterName: createFavoriteDto.characterName,
      characterImage: createFavoriteDto.characterImage,
      addedAt: new Date()
    };

    this.favorites.push(newFavorite);
    this.saveFavoritesToFile();
    return newFavorite;
  }

  async removeFavorite(userId: number, characterId: number): Promise<void> {
    const favoriteIndex = this.favorites.findIndex(
      fav => fav.userId === userId && fav.characterId === characterId
    );

    if (favoriteIndex === -1) {
      throw new NotFoundException('El personaje no está en tus favoritos');
    }

    this.favorites.splice(favoriteIndex, 1);
    this.saveFavoritesToFile();
  }

  async isFavorite(userId: number, characterId: number): Promise<boolean> {
    return this.favorites.some(
      fav => fav.userId === userId && fav.characterId === characterId
    );
  }

  async getFavoriteByCharacterId(userId: number, characterId: number): Promise<UserFavorite | null> {
    return this.favorites.find(
      fav => fav.userId === userId && fav.characterId === characterId
    ) || null;
  }

  // Método para limpiar favoritos de un usuario (útil para testing)
  async clearUserFavorites(userId: number): Promise<void> {
    this.favorites = this.favorites.filter(fav => fav.userId !== userId);
    this.saveFavoritesToFile();
  }
}
