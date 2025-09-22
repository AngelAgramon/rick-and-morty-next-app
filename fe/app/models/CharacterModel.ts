import { Character } from '../types';
import { makeAutoObservable } from 'mobx';

class CharacterModel {
    _characters: Character[] = [];
    _isError: boolean = false;
    _isLoading: boolean = false;
    _errorMessage: any = '';

    constructor() {
        makeAutoObservable(this);
      }   

      get characters () {
        return this._characters;
      }
    
      set characters (characters: Character[]) {
        this._characters = characters;
      }

      get isError () {
        return this._isError;
      }
    
      set isError (isError: boolean) {
        this._isError = isError;
      }
    
      get isLoading () {
        return this._isLoading;
      }
    
      set isLoading (isLoading: boolean) {
        this._isLoading = isLoading;
      }

      get errorMessage () {
        return this._errorMessage;
      }

      set errorMessage (errorMessage: string) {
        this._errorMessage = errorMessage;
      }
}

const characterModel = new CharacterModel();
export { characterModel };
