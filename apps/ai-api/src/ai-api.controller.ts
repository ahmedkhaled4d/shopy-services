import { Controller, Get } from '@nestjs/common';
import { AiApiService } from './ai-api.service';

@Controller()
export class AiApiController {
  constructor(private readonly aiApiService: AiApiService) {}

  @Get()
  getHello(): string {
    return this.aiApiService.getHello();
  }
}
