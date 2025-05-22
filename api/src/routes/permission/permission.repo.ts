import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  CreatePermissionBodyType,
  GetPermissionsResType,
  PermissionType,
  UpdatePermissionBodyType,
} from 'src/routes/permission/permission.model';

@Injectable()
export class PermissionRepo {
  constructor(private prismaService: PrismaService) {}

  async list(): Promise<GetPermissionsResType> {
    const data = await this.prismaService.permission.findMany({
      where: {
        deletedAt: null,
      },
    });
    return {
      permissions: data,
    };
  }

  findById(id: number): Promise<PermissionType | null> {
    return this.prismaService.permission.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create({
    createdById,
    data,
  }: {
    createdById: number | null;
    data: CreatePermissionBodyType;
  }): Promise<PermissionType> {
    return this.prismaService.permission.create({
      data: {
        ...data,
        createdById,
      },
    });
  }

  update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdatePermissionBodyType;
  }): Promise<PermissionType> {
    return this.prismaService.permission.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedById,
      },
    });
  }

  delete(
    {
      id,
      deletedById,
    }: {
      id: number;
      deletedById: number;
    },
    isHard?: boolean,
  ): Promise<PermissionType> {
    return isHard
      ? this.prismaService.permission.delete({
          where: {
            id,
          },
        })
      : this.prismaService.permission.update({
          where: {
            id,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        });
  }
}
