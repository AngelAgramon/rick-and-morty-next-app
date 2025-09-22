import CharactersView from "../views/CharactersView";
import { characterController, authController } from '../controllers';
import { useNavigate } from "@remix-run/react";

export default function CharactersPage() {
  const navigate = useNavigate();
  authController.validateRoute(); // Cadena o vacio

  if (!authController.validateRoute()) {
    navigate("/");
  }

  characterController.initialize();
  return <CharactersView />;
}
