import { Injectable } from '@nestjs/common';
import { NotFoundRecordException } from 'src/common/error';
import { isNotFoundPrismaError } from 'src/common/helpers';
import { PaginationQueryType } from 'src/common/models/request.model';
import {
  CreateBrandBodyType,
  UpdateBrandBodyType,
} from 'src/routes/brand/brand.model';
import { BrandRepo } from 'src/routes/brand/brand.repo';

@Injectable()
export class BrandService {
  constructor(private brandRepo: BrandRepo) {}

  async list(pagination: PaginationQueryType) {
    const data = await this.brandRepo.list(pagination);
    return data;
  }

  async findById(id: number) {
    const brand = await this.brandRepo.findById(id);
    if (!brand) {
      throw NotFoundRecordException;
    }
    return brand;
  }

  create({
    data,
    createdById,
  }: {
    data: CreateBrandBodyType;
    createdById: number;
  }) {
    return this.brandRepo.create({
      createdById,
      data,
    });
  }

  async update({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateBrandBodyType;
    updatedById: number;
  }) {
    try {
      const brand = await this.brandRepo.update({
        id,
        updatedById,
        data,
      });
      return brand;
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.brandRepo.delete({
        id,
        deletedById,
      });
      return {
        message: 'Xoá Brand Thành Công',
      };
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
