import { createZodDto } from 'nestjs-zod';
import {
  AddToCartBodySchema,
  CartItemSchema,
  DeleteCartBodySchema,
  GetCartItemParamsSchema,
  GetCartResSchema,
  UpdateCartItemBodySchema,
} from 'src/routes/cart/cart.model';
import { z } from 'zod';

export class CartItemDTO extends createZodDto(
  z.object({
    data: CartItemSchema,
  }),
) {}
export class GetCartResDTO extends createZodDto(
  z.object({
    data: GetCartResSchema,
  }),
) {}

export class GetCartItemParamsDTO extends createZodDto(
  GetCartItemParamsSchema,
) {}
export class AddToCartBodyDTO extends createZodDto(AddToCartBodySchema) {}

export class UpdateCartItemBodyDTO extends createZodDto(
  UpdateCartItemBodySchema,
) {}

export class DeleteCartBodyDTO extends createZodDto(DeleteCartBodySchema) {}
