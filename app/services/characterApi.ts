import { CharacterApiResponse } from "~/types";
import { Character } from "../../rick-and-morty-backend/src/types";
import { Api } from "./api";

export class CharacterApi extends Api {
    public constructor() {
        super();
    }
    
    public fetchRickAndMortyCharactersAPI = async (): Promise<Character[]> => {
        const response = await this.get<CharacterApiResponse>('/characters');
        return response.data.results;
    };

}