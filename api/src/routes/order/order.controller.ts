/* eslint-disable @typescript-eslint/no-unused-vars */

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import {
  CancelOrderBodyDTO,
  CancelOrderResDTO,
  CreateOrderBodyDTO,
  GetOrderDetailResDTO,
  GetOrderListResDTO,
  GetOrderParamsDTO,
} from 'src/routes/order/order.dto';
import { OrderService } from 'src/routes/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('admin')
  @ZodSerializerDto(GetOrderListResDTO)
  getAdminCart() {
    return this.orderService.listAdmin();
  }

  @Get()
  @ZodSerializerDto(GetOrderListResDTO)
  getCart(@ActiveUser('userId') userId: number) {
    return this.orderService.list(userId);
  }

  @Post()
  // @ZodSerializerDto(CreateOrderResDTO)
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

  @Post('confirm/:orderId')
  confirm(
    @ActiveUser('userId') userId: number,
    @Param() param: GetOrderParamsDTO,
  ) {
    return this.orderService.confirm(userId, param.orderId);
  }
}
