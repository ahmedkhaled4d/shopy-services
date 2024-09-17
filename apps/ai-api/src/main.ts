import { NestFactory } from '@nestjs/core';
import { AiApiModule } from './ai-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AiApiModule);
  await app.listen(3000);
}
bootstrap();
