import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  CharacterApiResponse,
  Character,
  CharacterQueryParams,
} from './dto/character.dto';

@Injectable()
export class CharactersService {
  private readonly rickAndMortyApiUrl =
    'https://rickandmortyapi.com/api/character';

  constructor(private readonly httpService: HttpService) {}

  async getCharacters(
    queryParams?: CharacterQueryParams,
  ): Promise<CharacterApiResponse> {
    try {
      let url = this.rickAndMortyApiUrl;

      // Construir query string si hay parámetros
      if (queryParams && Object.keys(queryParams).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, `${value}`);
          }
        });
        url += `?${searchParams.toString()}`;
      }

      const response = await firstValueFrom(
        this.httpService.get<CharacterApiResponse>(url),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw new HttpException(
        'Error al obtener personajes de la API externa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Character>(`${this.rickAndMortyApiUrl}/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching character ${id}:`, error);
      throw new HttpException(
        `Error al obtener el personaje con ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
