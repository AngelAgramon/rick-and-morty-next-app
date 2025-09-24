import { CharacterApiResponse, Character } from "../types";
import { ApiClient } from "./api";

export class CharacterApiClient extends ApiClient {
    public constructor() {
        super();
    }
    
    public fetchRickAndMortyCharactersAPI = async (): Promise<Character[]> => {       
        const response = await this.get<CharacterApiResponse>('/characters');
        return response.data.results;
    };

    public getCharacterById = async (id: string) : Promise<Character> => {
        const response = await this.get<Character>(`/character/${id}`);
        return response.data;
    };

}