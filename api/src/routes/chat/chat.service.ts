import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageBodyType } from './chat.model';
import { ChatRepo } from './chat.repo';

@Injectable()
@WebSocketGateway()
export class ChatService {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatRepo: ChatRepo) {}

  async getRooms() {
    return this.chatRepo.getRooms();
  }

  async getRoomByUserId(userId: number) {
    const result = await this.chatRepo.getRoomByUserId(Number(userId));
    return result;
  }
  async createMessage(data: CreateMessageBodyType) {
    const message = await this.chatRepo.createMessage(data);
    this.server.to(data.roomName).emit(`message-${data.roomName}`, message);
    return message;
  }
}
