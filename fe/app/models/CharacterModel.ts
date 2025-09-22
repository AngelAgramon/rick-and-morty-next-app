import { Character } from '../types';
import { makeAutoObservable } from 'mobx';

class CharacterModel {
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
  
}
const characterModel = new CharacterModel();
export { characterModel };


