import { CharacterApi } from "~/services";
import { makeAutoObservable } from 'mobx';
import { Character } from "~/types";
// export class CharacterController {
//   constructor(private characterModel: CharacterModel) {}

//   async fetchCharacters() {
//     this.characterModel.setLoading(true);
//     this.characterModel.setError(null);
    
//     try {
//       const api = new CharacterApi();
//       const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
//       this.characterModel.setCharacters(fetchedCharacters);
//       this.characterModel.setLoading(false);
//     } catch (error) {
//       this.characterModel.setError(error instanceof Error ? error.message : 'Failed to fetch characters');
//       this.characterModel.setLoading(false);
//     }
//   }
// }


class CharacterController {
  isLoading: boolean = false;
  characters: Character[] = [];
  isError: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getIsLoading () {
    return this.isLoading
  }

  get getcharacters () {
    return this.characters;
  }

  get getIsError () {
    return this.isError;
  }

  setIsLoading (isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async fetchCharacters() {
      this.setIsLoading(true);
      try {
        const api = new CharacterApi();
        const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
        this.characters = fetchedCharacters;
        this.setIsLoading(false);
      } catch (error) {
        this.setIsLoading(false);
        this.isError = true;
      }
  }
}

const characterController = new CharacterController();
export { characterController}