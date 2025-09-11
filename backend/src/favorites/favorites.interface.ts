export interface UserFavorite {
  id: number;
  userId: number;
  characterId: number;
  characterName: string;
  characterImage: string;
  addedAt: Date;
}

export interface CreateFavoriteDto {
  characterId: number;
  characterName: string;
  characterImage: string;
}

export interface FavoritesResponse {
  favorites: UserFavorite[];
  total: number;
}
