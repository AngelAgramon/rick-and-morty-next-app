import { CharacterApi } from "../services";
import { makeAutoObservable } from 'mobx';
import { Character } from "../types";
import { characterModel } from "../models";

class CharacterController {
  _characters: Character[] = [];
  private _characterApi: CharacterApi | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private getCharacterApi(): CharacterApi {
    if (!this._characterApi) {
      this._characterApi = new CharacterApi();
    }
    return this._characterApi;
  }

  fetchCharacters = async () => {
      try {
        characterModel.isLoading = true;
        characterModel.isError = false;
        
        const api = this.getCharacterApi();
        const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
        this._characters = fetchedCharacters;
     
      } catch (error) {
        //TODO: Search for a clean way to handle errors
        const errorMessage: any = error instanceof Error ? error.message : 'An unknown error occurred';

        // Message with more details
        const errorObject: any = error instanceof Error ? error : 'An unknown error occurred';
        console.log(`${errorObject.message} ${errorObject.code}`);

        characterModel.isError = true;
        characterModel.errorMessage = errorMessage;
      } finally {
        console.log("finally");
        characterModel.isLoading = false;
      }
  };

  initialize = () => {
    if (this._characters.length === 0 && !characterModel.isError && !characterModel.isLoading) {
      this.fetchCharacters();
    }
  };

  cleanup = (): void => {
    this._characters = [];
    this._characterApi = null;
  };
}

const characterController = new CharacterController();
export { characterController}