import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import type {
  CharacterApiResponse,
  Character,
  CharacterQueryParams,
} from './dto/character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters(
    @Query() queryParams: CharacterQueryParams,
  ): Promise<CharacterApiResponse> {
    return await this.charactersService.getCharacters(queryParams);
  }

  @Get(':id')
  async getCharacterById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    return await this.charactersService.getCharacterById(id);
  }
}
