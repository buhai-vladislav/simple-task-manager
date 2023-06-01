import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/Application';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './guards/JwtGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const logger = new Logger('NestApplication');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.enableCors({ origin: ['http://localhost:3000'] });

  await app.listen(AppModule.port);
  logger.log(`Server started on the ${AppModule.port} port.`);
}
bootstrap();
