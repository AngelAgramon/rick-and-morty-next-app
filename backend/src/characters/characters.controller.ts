import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  async getAllCharacters(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize, 10) : 21;
    return this.charactersService.getAllCharactersSimple(pageNumber, pageSizeNumber);
  }

  @Get('search')
  async searchCharacters(@Query('name') name: string) {
    if (!name) {
      return { error: 'El parámetro name es requerido' };
    }
    return this.charactersService.searchCharacters(name);
  }

  @Get(':id')
  async getCharacterById(@Param('id') id: string) {
    const characterId = parseInt(id, 10);
    if (isNaN(characterId)) {
      return { error: 'ID de personaje inválido' };
    }
    return this.charactersService.getCharacterById(characterId);
  }
}