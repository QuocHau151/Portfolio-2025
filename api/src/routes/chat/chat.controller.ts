import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/auth.decorator';
import { CreateMessageBodyType } from './chat.model';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getRooms() {
    return this.chatService.getRooms();
  }
  @IsPublic()
  @Get('user/:userId')
  getRoomByUserId(@Param('userId') userId: string) {
    return this.chatService.getRoomByUserId(Number(userId));
  }
  @Post()
  async createMessage(@Body() body: CreateMessageBodyType) {
    return this.chatService.createMessage(body);
  }
}
