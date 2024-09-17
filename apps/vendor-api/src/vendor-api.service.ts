import { Injectable } from '@nestjs/common';

@Injectable()
export class VendorApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
