import { CharacterApi } from '~/services';
import { CharacterModel } from '../models/CharacterModel';

export class CharacterController {
  constructor(private characterModel: CharacterModel) {}

  async fetchCharacters() {
    this.characterModel.setLoading(true);
    this.characterModel.setError(null);
    
    try {
      const api = new CharacterApi();
      const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
      this.characterModel.setCharacters(fetchedCharacters);
      this.characterModel.setLoading(false);
    } catch (error) {
      this.characterModel.setError(error instanceof Error ? error.message : 'Failed to fetch characters');
      this.characterModel.setLoading(false);
    }
  }
}