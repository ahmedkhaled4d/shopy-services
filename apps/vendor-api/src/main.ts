import { NestFactory } from '@nestjs/core';
import { VendorApiModule } from './vendor-api.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(VendorApiModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
