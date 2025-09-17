import { Character } from '../types/types';

export class CharacterModel {
  characters: Character[] = [];
  charactersLoading = false;
  charactersError: string | null = null;

  constructor() {
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
  }

  setLoading(loading: boolean) {
    this.charactersLoading = loading;
  }

  setError(error: string | null) {
    this.charactersError = error;
  }

  clearCharacters() {
    this.characters = [];
    this.charactersError = null;
  }
}