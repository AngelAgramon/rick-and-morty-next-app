import { useParams } from "@remix-run/react";
import {CharacterPage} from "../views";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { authController, characterController } from "../controllers";

export default function CharacterViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (!authController.validateRoute()) {
          navigate("/");
          return;
        }
        characterController.fetchCharacterById(id as string);
      }, [navigate, id]);

    return <CharacterPage />;
}
