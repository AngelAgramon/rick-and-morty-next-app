import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import type {
  CharacterApiResponse,
  Character,
  CharacterQueryParams,
} from './dto/character.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCharacters(
    @Query() queryParams: CharacterQueryParams,
  ): Promise<CharacterApiResponse> {
    return await this.charactersService.getCharacters(queryParams);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getCharacterById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    return await this.charactersService.getCharacterById(id);
  }
}
