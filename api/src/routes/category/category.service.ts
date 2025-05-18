import { Injectable } from '@nestjs/common';
import { NotFoundRecordException } from 'src/common/error';
import { isNotFoundPrismaError } from 'src/common/helpers';
import {
  CreateCategoryBodyType,
  UpdateCategoryBodyType,
} from 'src/routes/category/category.model';
import { CategoryRepo } from 'src/routes/category/category.repo';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepo) {}

  findAll() {
    return this.categoryRepo.findAll();
  }

  async findById(id: number) {
    const category = await this.categoryRepo.findById({
      id,
    });
    if (!category) {
      throw NotFoundRecordException;
    }
    return category;
  }

  create({
    data,
    createdById,
  }: {
    data: CreateCategoryBodyType;
    createdById: number;
  }) {
    return this.categoryRepo.create({
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
    data: UpdateCategoryBodyType;
    updatedById: number;
  }) {
    try {
      const category = await this.categoryRepo.update({
        id,
        updatedById,
        data,
      });
      return category;
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async delete({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.categoryRepo.delete({
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
