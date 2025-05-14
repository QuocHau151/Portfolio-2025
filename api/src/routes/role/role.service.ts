import { Injectable } from '@nestjs/common';
import { RoleName } from 'src/common/constants/role.constant';
import { NotFoundRecordException } from 'src/common/error';
import {
  isNotFoundPrismaError,
  isUniqueConstraintPrismaError,
} from 'src/common/helpers';
import {
  ProhibitedActionOnBaseRoleException,
  RoleAlreadyExistsException,
} from './role.error';
import {
  CreateRoleBodyType,
  GetRolesQueryType,
  UpdateRoleBodyType,
} from './role.model';
import { RoleRepo } from './role.repo';

@Injectable()
export class RoleService {
  constructor(private roleRepo: RoleRepo) {}

  async list(pagination: GetRolesQueryType) {
    const data = await this.roleRepo.list(pagination);
    return data;
  }

  async findById(id: number) {
    const role = await this.roleRepo.findById(id);
    if (!role) {
      throw NotFoundRecordException;
    }
    return role;
  }

  async create({
    data,
    createdById,
  }: {
    data: CreateRoleBodyType;
    createdById: number;
  }) {
    try {
      const role = await this.roleRepo.create({
        createdById,
        data,
      });
      return role;
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw RoleAlreadyExistsException;
      }
      throw error;
    }
  }

  /**
   * Kiểm tra xem role có phải là 1 trong 3 role cơ bản không
   */
  private async verifyRole(roleId: number) {
    const role = await this.roleRepo.findById(roleId);
    if (!role) {
      throw NotFoundRecordException;
    }
    const baseRoles: string[] = [RoleName.Admin];

    if (baseRoles.includes(role.name)) {
      throw ProhibitedActionOnBaseRoleException;
    }
  }

  async update({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateRoleBodyType;
    updatedById: number;
  }) {
    try {
      // Kiểm tra xem role có phải là 1 trong 3 role cơ bản không
      await this.verifyRole(id);

      const updatedRole = await this.roleRepo.update({
        id,
        updatedById,
        data,
      });
      return updatedRole;
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw RoleAlreadyExistsException;
      }
      throw error;
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.verifyRole(id);
      await this.roleRepo.delete({
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
