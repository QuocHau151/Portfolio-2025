import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentRepo } from './component.repo';
import { ComponentService } from './component.service';

@Module({
  imports: [],
  controllers: [ComponentController],
  providers: [ComponentService, ComponentRepo],
})
export class ComponentModule {}
