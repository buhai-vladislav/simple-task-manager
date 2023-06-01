import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/Application';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './guards/JwtGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(3000);
}
bootstrap();
