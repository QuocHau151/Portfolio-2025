import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers';
import { WebhookPaymentBodyType } from 'src/routes/payment/payment.model';
import { PaymentRepo } from 'src/routes/payment/payment.repo';

@Injectable()
@WebSocketGateway({ namespace: '' })
export class PaymentService {
  @WebSocketServer()
  server: Server;
  constructor(private readonly paymentRepo: PaymentRepo) {}

  async receiver(body: WebhookPaymentBodyType) {
    const userId = await this.paymentRepo.receiver(body);
    this.server.to(generateRoomUserId(userId)).emit('payment', {
      status: 'success',
    });

    return {
      message: 'Payment received successfully',
    };
  }
}
