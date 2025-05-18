import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/models/request.model';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  BrandIncludeTranslationType,
  BrandType,
  CreateBrandBodyType,
  GetBrandsResType,
  UpdateBrandBodyType,
} from 'src/routes/brand/brand.model';

@Injectable()
export class BrandRepo {
  constructor(private prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<GetBrandsResType> {
    const skip = (pagination.page - 1) * pagination.limit;
    const take = pagination.limit;
    const [totalItems, data] = await Promise.all([
      this.prismaService.brand.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prismaService.brand.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
    ]);
    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    };
  }

  findById(id: number): Promise<BrandIncludeTranslationType | null> {
    return this.prismaService.brand.findUnique({
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
    data: CreateBrandBodyType;
  }) {
    await this.prismaService.brand.create({
      data: {
        ...data,
        createdById,
      },
    });
    return { message: ' Tạo Brand Thành Công' };
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdateBrandBodyType;
  }) {
    await this.prismaService.brand.update({
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
      message: 'Cập nhật Brand thành công',
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
  ): Promise<BrandType> {
    return isHard
      ? this.prismaService.brand.delete({
          where: {
            id,
          },
        })
      : this.prismaService.brand.update({
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
