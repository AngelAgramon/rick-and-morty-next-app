import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'rick-and-morty-secret-key', // En producción usar variable de entorno
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    CharactersModule,
    FavoritesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}