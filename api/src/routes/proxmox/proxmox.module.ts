import { Module } from '@nestjs/common';
import { ProxmoxController } from './proxmox.controller';
import { ProxmoxRepo } from './proxmox.repo';
import { ProxmoxService } from './proxmox.service';

@Module({
  providers: [ProxmoxService, ProxmoxRepo],
  controllers: [ProxmoxController],
})
export class ProxmoxModule {}
