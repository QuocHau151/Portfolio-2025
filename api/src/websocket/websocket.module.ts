import { Module } from '@nestjs/common';
import { Gateway } from './main.gateway';

@Module({
  providers: [Gateway],
})
export class WebsocketModule {}
