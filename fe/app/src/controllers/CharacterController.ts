import { CharacterApi } from "~/services";
import { makeAutoObservable } from 'mobx';
import { Character } from "~/types";

class CharacterController {
  _characters: Character[] = [];
  _isError: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get characters () {
    return this._characters = [];
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

  fetchCharacters = async () => {
      try {
        
        const api = new CharacterApi();
        const fetchedCharacters = await api.fetchRickAndMortyCharactersAPI();
        this.characters = fetchedCharacters;
     
      } catch (error) {
        this.isError = true;
      }
  };
}

const characterController = new CharacterController();
export { characterController}