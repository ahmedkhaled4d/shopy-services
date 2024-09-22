import { Module } from '@nestjs/common';
import { ProfileService } from './profile/profile.service';
import { BillingService } from './billing/billing.service';
import { StoreService } from './store/store.service';
import { StoreController } from './store/store.controller';
import { BillingController } from './billing/billing.controller';
import { ProfileController } from './profile/profile.controller';

@Module({
  providers: [ProfileService, BillingService, StoreService],
  controllers: [StoreController, BillingController, ProfileController]
})
export class AccountModule {}
