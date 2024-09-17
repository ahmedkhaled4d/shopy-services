import { Module } from '@nestjs/common';
import { AiApiController } from './ai-api.controller';
import { AiApiService } from './ai-api.service';

@Module({
  imports: [],
  controllers: [AiApiController],
  providers: [AiApiService],
})
export class AiApiModule {}
