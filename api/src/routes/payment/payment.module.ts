import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PAYMENT_QUEUE_NAME } from 'src/common/constants/queue.constant';
import { PaymentProducer } from 'src/routes/payment/payment.producer';
import { PaymentRepo } from 'src/routes/payment/payment.repo';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_QUEUE_NAME,
    }),
  ],
  providers: [PaymentService, PaymentRepo, PaymentProducer],
  controllers: [PaymentController],
})
export class PaymentModule {}
