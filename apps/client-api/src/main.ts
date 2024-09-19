import { NestFactory } from '@nestjs/core';
import { ClientApiModule } from './client-api.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ClientApiModule);
  app.enableVersioning({ type: VersioningType.URI });
  await app.listen(3000);
}
bootstrap();
