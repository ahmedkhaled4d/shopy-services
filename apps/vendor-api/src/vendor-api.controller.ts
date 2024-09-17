import { Controller, Get } from '@nestjs/common';
import { VendorApiService } from './vendor-api.service';

@Controller()
export class VendorApiController {
  constructor(private readonly vendorApiService: VendorApiService) {}

  @Get()
  getHello(): string {
    return this.vendorApiService.getHello();
  }
}
