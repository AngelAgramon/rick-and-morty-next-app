import { CharacterApi } from "../services";
import { makeAutoObservable } from 'mobx';
import { Character } from "../types";
import { characterModel } from "../models";

class CharacterController {
  _characters: Character[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchCharacters = async () => {
      try {
        characterModel.isLoading = true;
        characterModel.isError = false;
        
        const api = new CharacterApi();
        const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
        this._characters = fetchedCharacters;
        console.log(fetchedCharacters);
     
      } catch (error) {
        characterModel.isError = true;
      } finally {
        characterModel.isLoading = false;
      }
  };

  initialize = () => {
    if (this._characters.length === 0 && !characterModel.isError && !characterModel.isLoading) {
      this.fetchCharacters();
    }
  };
}

const characterController = new CharacterController();
export { characterController}