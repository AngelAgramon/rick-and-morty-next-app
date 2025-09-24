import { CharacterApiClient } from "../services";
import { makeAutoObservable } from 'mobx';
import { Character } from "../types";
import { characterModel } from "../models";

class CharacterController {
  _characters: Character[] = [];
  _character: Character | null = null;
  private _characterApi: CharacterApiClient | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private getCharacterApi(): CharacterApiClient {
    if (!this._characterApi) {
      this._characterApi = new CharacterApiClient();
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

        characterModel.isError = true;
        characterModel.errorMessage = errorMessage;
      } finally {
        characterModel.isLoading = false;
      }
  };

  fetchCharacterById = async (id: string) => {
      try {
        characterModel.isLoading = true;
        characterModel.isError = false;

        const api = this.getCharacterApi();
        this._character = await api.getCharacterById(id);
      } catch (error) {
        const errorMessage: any = error instanceof Error ? error.message : 'An unknown error occurred';

        characterModel.isError = true;
        characterModel.errorMessage = errorMessage;
      } finally {
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