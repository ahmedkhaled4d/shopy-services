import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { WebsiteModule } from './website/website.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production'],
      isGlobal: true, // makes env variables available throughout the app
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
    WebsiteModule,
    DatabaseModule,
    StoreModule,
    ToolsModule,
  ],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
