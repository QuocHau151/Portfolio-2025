import { Injectable } from '@nestjs/common';
import { RoleType } from '../models/common-role.model';
import { PrismaService } from '../services/prisma.service';
import { RoleName } from '../constants/role.constant';

@Injectable()
export class CommonRoleRepository {
  private clientRoleId: number | null = null;
  private adminRoleId: number | null = null;

  constructor(private readonly prismaService: PrismaService) {}

  private async getRole(roleName: string) {
    const role: RoleType = await this.prismaService.$queryRaw`
    SELECT * FROM "Role" WHERE name = ${roleName} AND "deletedAt" IS NULL LIMIT 1;
  `.then((res: RoleType[]) => {
      if (res.length === 0) {
        throw new Error('Role not found');
      }
      return res[0];
    });
    return role;
  }

  async getClientRoleId() {
    if (this.clientRoleId) {
      return this.clientRoleId;
    }
    const role = await this.getRole(RoleName.Client);

    this.clientRoleId = role.id;
    return role.id;
  }

  async getAdminRoleId() {
    if (this.adminRoleId) {
      return this.adminRoleId;
    }
    const role = await this.getRole(RoleName.Admin);

    this.adminRoleId = role.id;
    return role.id;
  }
}
