import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatRepo } from './chat.repo';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, ChatRepo],
  exports: [],
})
export class ChatModule {}
