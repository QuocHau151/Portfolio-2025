import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  AddToCartBodyDTO,
  CartItemDTO,
  DeleteCartBodyDTO,
  GetCartItemParamsDTO,
  UpdateCartItemBodyDTO,
} from 'src/routes/cart/cart.dto';

import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  // @ZodSerializerDto(GetCartResDTO)
  getCart(
    @ActiveUser('userId') userId: number,
    @Query() query: PaginationQueryDTO,
  ) {
    return this.cartService.getCart(userId, query);
  }

  @Post()
  @ZodSerializerDto(CartItemDTO)
  addToCart(
    @Body() body: AddToCartBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.cartService.addToCart(userId, body);
  }

  @Put(':cartItemId')
  @ZodSerializerDto(MessageResDTO)
  updateCartItem(
    @ActiveUser('userId') userId: number,
    @Param() param: GetCartItemParamsDTO,
    @Body() body: UpdateCartItemBodyDTO,
  ) {
    return this.cartService.updateCartItem({
      userId,
      cartItemId: param.cartItemId,
      body,
    });
  }

  @Post('delete')
  @ZodSerializerDto(MessageResDTO)
  deleteCart(
    @Body() body: DeleteCartBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.cartService.deleteCart(userId, body);
  }
}
