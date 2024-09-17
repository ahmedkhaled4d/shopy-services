import { Module } from '@nestjs/common';
import { VendorApiController } from './vendor-api.controller';
import { VendorApiService } from './vendor-api.service';

@Module({
  imports: [],
  controllers: [VendorApiController],
  providers: [VendorApiService],
})
export class VendorApiModule {}
