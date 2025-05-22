import { Injectable } from '@nestjs/common';
import {
  AddToCartBodyType,
  DeleteCartBodyType,
  UpdateCartItemBodyType,
} from 'src/routes/cart/cart.model';

import { PaginationQueryType } from 'src/common/models/request.model';
import { CartRepo } from './cart.repo';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepo) {}

  getCart(userId: number, query: PaginationQueryType) {
    return this.cartRepo.list({
      userId,
      page: query.page,
      limit: query.limit,
    });
  }

  addToCart(userId: number, body: AddToCartBodyType) {
    return this.cartRepo.create(userId, body);
  }

  async updateCartItem({
    userId,
    body,
    cartItemId,
  }: {
    userId: number;
    cartItemId: number;
    body: UpdateCartItemBodyType;
  }) {
    await this.cartRepo.update({
      userId,
      body,
      cartItemId,
    });
    return {
      message: 'Update cart item successfully',
    };
  }

  async deleteCart(userId: number, body: DeleteCartBodyType) {
    const { count } = await this.cartRepo.delete(userId, body);
    return {
      message: `${count} item(s) deleted from cart`,
    };
  }
}
