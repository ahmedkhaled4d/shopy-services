import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { OnboardingModule } from './onboarding/onboarding.module';
import { AuthModule } from './auth/auth.module';
import { WebsiteModule } from './website/website.module';
import { CatalogModule } from './catalog/catalog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

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
    OnboardingModule,
    AuthModule,
    WebsiteModule,
    CatalogModule,
    DatabaseModule,
  ],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
