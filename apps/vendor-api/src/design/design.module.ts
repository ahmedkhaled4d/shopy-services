import { Module } from '@nestjs/common';
import { StorefrontService } from './storefront/storefront.service';
import { CheckoutService } from './checkout/checkout.service';
import { AppearanceService } from './appearance/appearance.service';

@Module({
  providers: [StorefrontService, CheckoutService, AppearanceService]
})
export class DesignModule {}
