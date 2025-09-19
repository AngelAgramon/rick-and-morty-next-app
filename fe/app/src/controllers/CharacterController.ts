import { CharacterApi } from "../services";
import { makeAutoObservable } from 'mobx';
import { Character } from "../../types";

class CharacterController {
  _characters: Character[] = [];
  _isError: boolean = false;
  _isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get characters () {
    return this._characters;
  }

  set characters (characters: Character[]) {
    this._characters = characters;
  }

  set isError (isError: boolean) {
    this._isError = isError;
  }

  get isError () {
    return this._isError;
  }

  get isLoading () {
    return this._isLoading;
  }

  set isLoading (isLoading: boolean) {
    this._isLoading = isLoading;
  }

  fetchCharacters = async () => {
      try {
        this.isLoading = true;
        this.isError = false;
        
        const api = new CharacterApi();
        const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
        this.characters = fetchedCharacters;
     
      } catch (error) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
  };
}

const characterController = new CharacterController();
export { characterController}