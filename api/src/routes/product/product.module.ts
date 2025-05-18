import { Module } from '@nestjs/common';

import { ProductController } from 'src/routes/product/product.controller';
import { ProductRepo } from 'src/routes/product/product.repo';
import { ProductService } from 'src/routes/product/product.service';
import { ManageProductController } from './manage-product.controller';
import { ManageProductService } from './manage-product.service';

@Module({
  providers: [ProductService, ProductRepo, ManageProductService],
  controllers: [ProductController, ManageProductController],
})
export class ProductModule {}
