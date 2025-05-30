import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ProxmoxRepo {
  private readonly baseUrl = process.env.PROXMOX_URL;
  private readonly username = process.env.PROXMOX_USERNAME;
  private readonly password = process.env.PROXMOX_PASSWORD;
  private tokenTTL = 7200 * 1000;
  constructor(private readonly prismaService: PrismaService) {}

  async refreshToken() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/access/ticket?username=${this.username}&password=${this.password}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
          }),
        },
      );

      if (response.data && response.data.data) {
        const result = response.data.data;
        return {
          CSRFPreventionToken: result.CSRFPreventionToken,
          ticket: result.ticket,
        };
      } else {
        throw new Error('Invalid response format from Proxmox API');
      }
    } catch (error) {
      console.error('Error refreshing Proxmox token:', error);
      throw error;
    }
  }

  async getToken() {
    const token = await this.prismaService.proxmoxToken.findFirst();

    if (!token) {
      const newToken = await this.refreshToken();
      await this.prismaService.proxmoxToken.create({
        data: {
          CSRFPreventionToken: newToken.CSRFPreventionToken,
          ticket: newToken.ticket,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return newToken;
    }

    if (Date.now() - token.updatedAt.getTime() > this.tokenTTL) {
      const newToken = await this.refreshToken();
      await this.prismaService.proxmoxToken.update({
        where: {
          id: token.id,
        },
        data: {
          CSRFPreventionToken: newToken.CSRFPreventionToken,
          ticket: newToken.ticket,
          updatedAt: new Date(),
        },
      });
      return newToken;
    }

    return token;
  }

  async startVm(vmId: number) {
    const token = await this.getToken();
    const response = await axios.post(
      `${this.baseUrl}/nodes/proxmox/qemu/${vmId}/status/start`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          CSRFPreventionToken: token.CSRFPreventionToken,
          Cookie: `PVEAuthCookie=${token.ticket}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }),
      },
    );
    return response.data;
  }
  async stopVm(vmId: number) {
    const token = await this.getToken();
    const response = await axios.post(
      `${this.baseUrl}/nodes/proxmox/qemu/${vmId}/status/stop`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          CSRFPreventionToken: token.CSRFPreventionToken,
          Cookie: `PVEAuthCookie=${token.ticket}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }),
      },
    );
    return response.data;
  }
  async rebootVm(vmId: number) {
    const token = await this.getToken();
    const response = await axios.post(
      `${this.baseUrl}/nodes/proxmox/qemu/${vmId}/status/reboot`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          CSRFPreventionToken: token.CSRFPreventionToken,
          Cookie: `PVEAuthCookie=${token.ticket}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }),
      },
    );
    return response.data;
  }
}
