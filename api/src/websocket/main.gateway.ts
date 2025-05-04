import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class Gateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('', {
      data: `${data}`,
    });
    console.log('vào socket');
    return data;
  }
}
