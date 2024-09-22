import { Module } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { ProductService } from './product/product.service';
import { CatalogController } from './catalog.controller';

@Module({
  providers: [CategoryService, ProductService],
  controllers: [CatalogController],
})
export class CatalogModule {}
