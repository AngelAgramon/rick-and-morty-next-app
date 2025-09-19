import CharactersView from "../views/CharactersView";
import { characterController, authController } from '../controllers';

export default function CharactersPage() {
  authController.validateRoute();

  characterController.initialize();
  return <CharactersView />;
}
