import { Module } from '@nestjs/common';
import { VendorApiController } from './vendor-api.controller';
import { VendorApiService } from './vendor-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env variables available throughout the app
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [VendorApiController],
  providers: [VendorApiService],
})
export class VendorApiModule {}
