import { NestFactory } from '@nestjs/core';
import { ClientApiModule } from './client-api.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ClientApiModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
