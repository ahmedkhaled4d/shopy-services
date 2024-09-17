import { NestFactory } from '@nestjs/core';
import { VendorApiModule } from './vendor-api.module';

async function bootstrap() {
  const app = await NestFactory.create(VendorApiModule);
  await app.listen(3000);
}
bootstrap();
