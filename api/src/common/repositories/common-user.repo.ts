import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UserType } from '../models/common-user.model';
import { RoleType } from '../models/common-role.model';
import { PermissionType } from '../models/common-permission';

type UserIncludeRolePermissionsType = UserType & {
  role: RoleType & { permissions: PermissionType[] };
};

export type WhereUniqueUserType =
  | { id: number; deletedAt?: null }
  | { email: string; deletedAt?: null };

@Injectable()
export class CommonUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique(where: WhereUniqueUserType): Promise<UserType | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  }

  findUniqueIncludeRolePermissions(
    where: WhereUniqueUserType,
  ): Promise<UserIncludeRolePermissionsType | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        role: {
          include: {
            permissions: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },
    });
  }
  update(
    where: { id: number; deletedAt?: null },
    data: Partial<UserType>,
  ): Promise<UserType | null> {
    return this.prismaService.user.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data,
    });
  }
  findUserByEmail(email: string): Promise<UserType | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }
}
