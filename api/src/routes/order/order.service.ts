import { Injectable } from '@nestjs/common';
import {
  CreateOrderBodyType,
  GetOrderListQueryType,
} from 'src/routes/order/order.model';
import { OrderRepo } from 'src/routes/order/order.repo';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo) {}

  async list(userId: number, query: GetOrderListQueryType) {
    return await this.orderRepo.list(userId, query);
  }

  async create(userId: number, body: CreateOrderBodyType) {
    await this.orderRepo.create(userId, body);
    return {
      message: 'Order created successfully',
    };
  }

  cancel(userId: number, orderId: number) {
    return this.orderRepo.cancel(userId, orderId);
  }

  detail(userId: number, orderId: number) {
    return this.orderRepo.detail(userId, orderId);
  }
}
