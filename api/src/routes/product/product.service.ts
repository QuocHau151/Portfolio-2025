import { Injectable } from '@nestjs/common';
import { NotFoundRecordException } from 'src/common/error';

import { GetProductsQueryType } from 'src/routes/product/product.model';
import { ProductRepo } from 'src/routes/product/product.repo';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepo) {}

  async list(props: { query: GetProductsQueryType }) {
    const data = await this.productRepo.list({
      page: props.query.page,
      limit: props.query.limit,
      isPublic: true,
      brands: props.query.brands,
      minPrice: props.query.minPrice,
      maxPrice: props.query.maxPrice,
      categories: props.query.categories,
      name: props.query.name,
      createdById: props.query.createdById,
      orderBy: props.query.orderBy,
      sortBy: props.query.sortBy,
    });
    return data;
  }

  async getDetail(props: { productId: number }) {
    const product = await this.productRepo.getDetail({
      productId: props.productId,
      isPublic: true,
    });
    if (!product) {
      throw NotFoundRecordException;
    }
    return product;
  }
}
