import { Controller, Get, Param, Query } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { ZodSerializerDto } from 'nestjs-zod';
import { IsPublic } from 'src/common/decorators/auth.decorator';
import {
  GetProductDetailResDTO,
  GetProductParamsDTO,
  GetProductsQueryDTO,
  GetProductsResDTO,
} from './product.dto';
import { ProductService } from './product.service';

@SkipThrottle()
@Controller('products')
@IsPublic()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @SkipThrottle({ default: false })
  @Get()
  @ZodSerializerDto(GetProductsResDTO)
  list(@Query() query: GetProductsQueryDTO) {
    return this.productService.list({
      query,
    });
  }

  @SkipThrottle({ default: false })
  @Get(':productId')
  @ZodSerializerDto(GetProductDetailResDTO)
  findById(@Param() params: GetProductParamsDTO) {
    return this.productService.getDetail({
      productId: params.productId,
    });
  }
}
