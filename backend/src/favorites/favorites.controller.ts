import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  Body, 
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFavoriteDto } from './favorites.interface';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getUserFavorites(@Request() req) {
    const userId = req.user.sub; // El ID del usuario viene del token JWT
    return this.favoritesService.getUserFavorites(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    const userId = req.user.sub;
    return this.favoritesService.addFavorite(userId, createFavoriteDto);
  }

  @Delete(':characterId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavorite(@Request() req, @Param('characterId') characterId: string) {
    const userId = req.user.sub;
    const characterIdNumber = parseInt(characterId, 10);
    
    if (isNaN(characterIdNumber)) {
      throw new Error('ID de personaje inválido');
    }

    await this.favoritesService.removeFavorite(userId, characterIdNumber);
  }

  @Get('check/:characterId')
  async checkIfFavorite(@Request() req, @Param('characterId') characterId: string) {
    const userId = req.user.sub;
    const characterIdNumber = parseInt(characterId, 10);
    
    if (isNaN(characterIdNumber)) {
      throw new Error('ID de personaje inválido');
    }

    const isFavorite = await this.favoritesService.isFavorite(userId, characterIdNumber);
    return { isFavorite };
  }

  @Get('character/:characterId')
  async getFavoriteByCharacterId(@Request() req, @Param('characterId') characterId: string) {
    const userId = req.user.sub;
    const characterIdNumber = parseInt(characterId, 10);
    
    if (isNaN(characterIdNumber)) {
      throw new Error('ID de personaje inválido');
    }

    return this.favoritesService.getFavoriteByCharacterId(userId, characterIdNumber);
  }
}
