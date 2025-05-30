import { Injectable } from '@nestjs/common';
import { CreateOrderBodyType } from 'src/routes/order/order.model';
import { OrderRepo } from 'src/routes/order/order.repo';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo) {}
  async listAdmin() {
    return await this.orderRepo.listAdmin();
  }
  async list(userId: number) {
    return await this.orderRepo.list(userId);
  }

  async create(userId: number, body: CreateOrderBodyType) {
    return await this.orderRepo.create(userId, body);
  }

  cancel(userId: number, orderId: number) {
    return this.orderRepo.cancel(userId, orderId);
  }

  detail(userId: number, orderId: number) {
    return this.orderRepo.detail(userId, orderId);
  }
  confirm(userId: number, orderId: number) {
    return this.orderRepo.confirm(userId, orderId);
  }
}
