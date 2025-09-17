import { CharacterModel } from '../models/CharacterModel';
import { fetchRickAndMortyCharactersAPI } from '../services/api';

export class CharacterController {
  constructor(private characterModel: CharacterModel) {}

  async fetchCharacters() {
    this.characterModel.setLoading(true);
    this.characterModel.setError(null);
    
    try {
      const fetchedCharacters = await fetchRickAndMortyCharactersAPI();
      this.characterModel.setCharacters(fetchedCharacters);
      this.characterModel.setLoading(false);
    } catch (error) {
      this.characterModel.setError(error instanceof Error ? error.message : 'Failed to fetch characters');
      this.characterModel.setLoading(false);
    }
  }
}