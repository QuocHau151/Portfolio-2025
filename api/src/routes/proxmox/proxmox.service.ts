import { Injectable } from '@nestjs/common';
import { ProxmoxRepo } from './proxmox.repo';

@Injectable()
export class ProxmoxService {
  constructor(private readonly proxmoxRepo: ProxmoxRepo) {}
  getToken() {
    return this.proxmoxRepo.getToken();
  }
  startVm(vmId: number) {
    return this.proxmoxRepo.startVm(vmId);
  }
  stopVm(vmId: number) {
    return this.proxmoxRepo.stopVm(vmId);
  }
  rebootVm(vmId: number) {
    return this.proxmoxRepo.rebootVm(vmId);
  }
}
