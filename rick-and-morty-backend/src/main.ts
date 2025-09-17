import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el frontend Next.js
  app.enableCors({
    origin: 'http://localhost:3000', // URL del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend ejecutándose en http://localhost:${port}`);
  console.log(`Documentación disponible en http://localhost:${port}/api`);
}
bootstrap();
