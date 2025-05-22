import { createZodDto } from 'nestjs-zod';
import {
  CancelOrderBodySchema,
  CancelOrderResSchema,
  CreateOrderBodySchema,
  CreateOrderResSchema,
  GetOrderDetailResSchema,
  GetOrderListQuerySchema,
  GetOrderListResSchema,
  GetOrderParamsSchema,
} from 'src/routes/order/order.model';
import { z } from 'zod';

export class GetOrderListResDTO extends createZodDto(
  z.object({
    data: GetOrderListResSchema,
  }),
) {}

export class GetOrderListQueryDTO extends createZodDto(
  GetOrderListQuerySchema,
) {}

export class GetOrderDetailResDTO extends createZodDto(
  z.object({
    data: GetOrderDetailResSchema,
  }),
) {}

export class CreateOrderBodyDTO extends createZodDto(CreateOrderBodySchema) {}

export class CancelOrderBodyDTO extends createZodDto(CancelOrderBodySchema) {}

export class CreateOrderResDTO extends createZodDto(
  z.object({
    data: CreateOrderResSchema,
  }),
) {}

export class CancelOrderResDTO extends createZodDto(
  z.object({
    data: CancelOrderResSchema,
  }),
) {}

export class GetOrderParamsDTO extends createZodDto(GetOrderParamsSchema) {}
