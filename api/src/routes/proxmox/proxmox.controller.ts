import { Controller, Get, Param, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProxmoxService } from './proxmox.service';

@Controller('proxmox')
export class ProxmoxController {
  constructor(private readonly proxmoxService: ProxmoxService) {}

  @Get('ticket')
  @Cron('0 0 */2 * * *')
  getTicket() {
    return this.proxmoxService.getToken();
  }

  @Post('start-vm/:vmId')
  startVm(@Param() param: { vmId: number }) {
    return this.proxmoxService.startVm(param.vmId);
  }

  @Post('stop-vm/:vmId')
  stopVm(@Param() param: { vmId: number }) {
    return this.proxmoxService.stopVm(param.vmId);
  }

  @Post('reboot-vm/:vmId')
  rebootVm(@Param() param: { vmId: number }) {
    return this.proxmoxService.rebootVm(param.vmId);
  }
}
