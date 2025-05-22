import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { OrderController } from 'src/routes/order/order.controller';
import { OrderProducer } from 'src/routes/order/order.producer';

import { PAYMENT_QUEUE_NAME } from 'src/common/constants/queue.constant';
import { OrderRepo } from './order.repo';
import { OrderService } from './order.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_QUEUE_NAME,
    }),
  ],
  providers: [OrderService, OrderRepo, OrderProducer],
  controllers: [OrderController],
})
export class OrderModule {}
