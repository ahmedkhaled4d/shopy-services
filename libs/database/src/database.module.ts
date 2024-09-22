import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from './schemas/vendor.schema';
import { Logger, LoggerSchema } from './schemas/logger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vendor.name, schema: VendorSchema },
      { name: Logger.name, schema: LoggerSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
