import { Injectable } from '@nestjs/common';
import { NotFoundRecordException } from 'src/common/error';
import {
  isNotFoundPrismaError,
  isUniqueConstraintPrismaError,
} from 'src/common/helpers';
import { PermissionAlreadyExistsException } from 'src/routes/permission/permission.error';
import {
  CreatePermissionBodyType,
  UpdatePermissionBodyType,
} from 'src/routes/permission/permission.model';
import { PermissionRepo } from 'src/routes/permission/permission.repo';

@Injectable()
export class PermissionService {
  constructor(private permissionRepo: PermissionRepo) {}

  async list() {
    const data = await this.permissionRepo.list();
    return data;
  }

  async findById(id: number) {
    const permission = await this.permissionRepo.findById(id);
    if (!permission) {
      throw NotFoundRecordException;
    }
    return permission;
  }

  async create({
    data,
    createdById,
  }: {
    data: CreatePermissionBodyType;
    createdById: number;
  }) {
    try {
      return await this.permissionRepo.create({
        createdById,
        data,
      });
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw PermissionAlreadyExistsException;
      }
      throw error;
    }
  }

  async update({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdatePermissionBodyType;
    updatedById: number;
  }) {
    try {
      const permission = await this.permissionRepo.update({
        id,
        updatedById,
        data,
      });
      return permission;
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw PermissionAlreadyExistsException;
      }
      throw error;
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.permissionRepo.delete({
        id,
        deletedById,
      });
      return {
        message: 'Delete successfully',
      };
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
