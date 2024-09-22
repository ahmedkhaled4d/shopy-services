import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VendorApiController } from './vendor-api.controller';
import { VendorApiService } from './vendor-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CatalogModule } from './catalog/catalog.module';
import { DesignModule } from './design/design.module';
import { ReviewModule } from './review/review.module';
import { MarketingModule } from './marketing/marketing.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountModule } from './account/account.module';
import { CommonModule } from '@app/common';
import { LoggerMiddleware } from '@app/common/logger/logger.middleware';

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
    CommonModule,
    OrderModule,
    CatalogModule,
    DesignModule,
    ReviewModule,
    MarketingModule,
    AnalyticsModule,
    DashboardModule,
    AccountModule,
  ],
  controllers: [VendorApiController],
  providers: [VendorApiService],
})
export class VendorApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
