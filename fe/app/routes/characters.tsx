import CharactersView from "../views/CharactersView";
import { characterController, authController } from '../controllers';
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function CharactersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authController.validateRoute()) {
      navigate("/");
      return;
    }
    characterController.initialize();
  }, [navigate]);

  if (!authController.validateRoute()) {
    return null;
  }

  return <CharactersView />;
}
