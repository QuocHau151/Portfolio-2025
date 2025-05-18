import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  CreateCategoryBodyType,
  UpdateCategoryBodyType,
} from 'src/routes/category/category.model';

@Injectable()
export class CategoryRepo {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const categories = await this.prismaService.category.findMany({
      where: {
        deletedAt: null,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: categories,
      totalItems: categories.length,
    };
  }

  findById({ id }: { id: number }) {
    return this.prismaService.category.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async create({
    createdById,
    data,
  }: {
    createdById: number | null;
    data: CreateCategoryBodyType;
  }) {
    await this.prismaService.category.create({
      data: {
        ...data,
        createdById,
      },
    });
    return {
      message: 'Tạo Category Thành Công',
    };
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdateCategoryBodyType;
  }) {
    await this.prismaService.category.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedById,
      },
    });
    return {
      message: 'Update Category Thành Công',
    };
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
  ) {
    return isHard
      ? this.prismaService.category.delete({
          where: {
            id,
          },
        })
      : this.prismaService.category.update({
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
