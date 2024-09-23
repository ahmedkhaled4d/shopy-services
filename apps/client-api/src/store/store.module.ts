import { Module } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';

@Module({
  providers: [ProductService, OrderService],
  controllers: [OrderController, ProductController]
})
export class StoreModule {}
