/* eslint-disable @typescript-eslint/no-unused-vars */

import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import {
  CancelOrderBodyDTO,
  CancelOrderResDTO,
  CreateOrderBodyDTO,
  GetOrderDetailResDTO,
  GetOrderListQueryDTO,
  GetOrderListResDTO,
  GetOrderParamsDTO,
} from 'src/routes/order/order.dto';
import { OrderService } from 'src/routes/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ZodSerializerDto(GetOrderListResDTO)
  getCart(
    @ActiveUser('userId') userId: number,
    @Query() query: GetOrderListQueryDTO,
  ) {
    return this.orderService.list(userId, query);
  }

  @Post()
  @ZodSerializerDto(MessageResDTO)
  create(
    @ActiveUser('userId') userId: number,
    @Body() body: CreateOrderBodyDTO,
  ) {
    return this.orderService.create(userId, body);
  }

  @Get(':orderId')
  @ZodSerializerDto(GetOrderDetailResDTO)
  detail(
    @ActiveUser('userId') userId: number,
    @Param() param: GetOrderParamsDTO,
  ) {
    return this.orderService.detail(userId, param.orderId);
  }

  @Put(':orderId')
  @ZodSerializerDto(CancelOrderResDTO)
  cancel(
    @ActiveUser('userId') userId: number,
    @Param() param: GetOrderParamsDTO,
    @Body() _: CancelOrderBodyDTO,
  ) {
    return this.orderService.cancel(userId, param.orderId);
  }
}
