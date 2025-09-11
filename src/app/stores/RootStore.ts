import { AuthStore } from './AuthStore';
import { CharacterStore } from './CharacterStore';
import { UIStore } from './UIStore';

export class RootStore {
  authStore: AuthStore;
  characterStore: CharacterStore;
  uiStore: UIStore;

  constructor() {
    this.authStore = new AuthStore();
    this.characterStore = new CharacterStore();
    this.uiStore = new UIStore();
  }
} 