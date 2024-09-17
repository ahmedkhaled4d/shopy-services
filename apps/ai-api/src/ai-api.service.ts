import { Injectable } from '@nestjs/common';

@Injectable()
export class AiApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
