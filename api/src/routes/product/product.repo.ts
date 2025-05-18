import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  OrderByType,
  SortBy,
  SortByType,
} from 'src/common/constants/other.constant';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  CreateProductBodyType,
  UpdateProductBodyType,
} from 'src/routes/product/product.model';

@Injectable()
export class ProductRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async list({
    limit,
    page,
    name,
    brands,
    categories,
    minPrice,
    maxPrice,
    createdById,
    isPublic,
    orderBy,
    sortBy,
  }: {
    limit: number;
    page: number;
    name?: string;
    brands?: number[];
    categories?: number[];
    minPrice?: number;
    maxPrice?: number;
    createdById?: number;
    isPublic?: boolean;
    orderBy: OrderByType;
    sortBy: SortByType;
  }) {
    const skip = (page - 1) * limit;
    const take = limit;
    let where: Prisma.ProductWhereInput = {
      deletedAt: null,
      createdById: createdById ? createdById : undefined,
    };
    if (isPublic === true) {
      where.publishedAt = {
        lte: new Date(),
        not: null,
      };
    } else if (isPublic === false) {
      where = {
        ...where,
        OR: [{ publishedAt: null }, { publishedAt: { gt: new Date() } }],
      };
    }
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (brands && brands.length > 0) {
      where.brands = {
        some: {
          id: {
            in: brands,
          },
        },
      };
    }
    if (categories && categories.length > 0) {
      where.categories = {
        some: {
          id: {
            in: categories,
          },
        },
      };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {
        gte: minPrice,
        lte: maxPrice,
      };
    }
    // Mặc định sort theo createdAt mới nhất
    let caculatedOrderBy:
      | Prisma.ProductOrderByWithRelationInput
      | Prisma.ProductOrderByWithRelationInput[] = {
      createdAt: orderBy,
    };
    if (sortBy === SortBy.Price) {
      caculatedOrderBy = {
        basePrice: orderBy,
      };
    } else if (sortBy === SortBy.Sale) {
      caculatedOrderBy = {
        orders: {
          _count: orderBy,
        },
      };
    }
    const [totalItems, data] = await Promise.all([
      this.prismaService.product.count({
        where,
      }),
      this.prismaService.product.findMany({
        where,
        orderBy: caculatedOrderBy,
        skip,
        take,
        include: {
          skus: {
            where: {
              deletedAt: null,
            },
          },
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
          brands: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
    ]);

    return {
      data,
      totalItems,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalItems / limit),
    };
  }

  findById(productId: number) {
    return this.prismaService.product.findUnique({
      where: {
        id: productId,
        deletedAt: null,
      },
    });
  }

  getDetail({
    productId,
    isPublic = true,
  }: {
    productId: number;
    isPublic?: boolean;
  }) {
    let where: Prisma.ProductWhereUniqueInput = {
      id: productId,
      deletedAt: null,
    };
    if (isPublic === true) {
      where.publishedAt = {
        lte: new Date(),
        not: null,
      };
    } else if (isPublic === false) {
      where = {
        ...where,
        OR: [{ publishedAt: null }, { publishedAt: { gt: new Date() } }],
      };
    }
    return this.prismaService.product.findUnique({
      where,
      include: {
        skus: {
          where: {
            deletedAt: null,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        brands: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create({
    createdById,
    data,
  }: {
    createdById: number;
    data: CreateProductBodyType;
  }) {
    const { skus, categories, brands, ...productData } = data;

    await this.prismaService.product.create({
      data: {
        createdById,
        ...productData,
        categories: {
          connect: categories.map((category) => ({ id: category })),
        },
        brands: {
          connect: brands.map((brand) => ({ id: brand })),
        },
        skus: {
          createMany: {
            data: skus.map((sku) => ({
              ...sku,
              createdById,
              images: sku.images || [],
            })),
          },
        },
      },
    });
    return {
      message: 'Tạo Sản Phẩm Thành Công',
    };
  }

  async update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdateProductBodyType;
  }) {
    const { skus: dataSkus, categories, brands, ...productData } = data;
    // SKU đã tồn tại trong DB nhưng không có trong data payload thì sẽ bị xóa
    // SKU đã tồn tại trong DB nhưng có trong data payload thì sẽ được cập nhật
    // SKY không tồn tại trong DB nhưng có trong data payload thì sẽ được thêm mới

    // 1. Lấy danh sách SKU hiện tại trong DB
    const existingSKUs = await this.prismaService.sKU.findMany({
      where: {
        productId: id,
        deletedAt: null,
      },
    });

    // 2. Tìm các SKUs cần xóa (tồn tại trong DB nhưng không có trong data payload)
    const skusToDelete = existingSKUs.filter((sku) =>
      dataSkus.every((dataSku) => dataSku.value !== sku.value),
    );
    const skuIdsToDelete = skusToDelete.map((sku) => sku.id);

    // 3. Mapping ID vào trong data payload
    const skusWithId = dataSkus.map((dataSku) => {
      const existingSku = existingSKUs.find(
        (existingSKU) => existingSKU.value === dataSku.value,
      );
      return {
        ...dataSku,
        id: existingSku ? existingSku.id : null,
      };
    });

    // 4. Tìm các skus để cập nhật
    const skusToUpdate = skusWithId.filter((sku) => sku.id !== null);

    // 5. Tìm các skus để thêm mới
    const skusToCreate = skusWithId
      .filter((sku) => sku.id === null)
      .map((sku) => {
        const { id: skuId, ...skuData } = sku; // đổi tên id thành skuId
        console.log(skuId);
        return {
          ...skuData,
          productId: id, // sử dụng id của product từ tham số function
          createdById: updatedById,
        };
      });

    await this.prismaService.$transaction([
      // Cập nhật Product
      this.prismaService.product.update({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          ...productData,
          updatedById,
          categories: {
            connect: categories.map((category) => ({ id: category })),
          },
          brands: {
            connect: brands.map((brand) => ({ id: brand })),
          },
        },
      }),
      // Xóa Cứng các SKU không có trong data payload
      this.prismaService.sKU.deleteMany({
        where: {
          id: {
            in: skuIdsToDelete,
          },
        },
      }),
      // Cập nhật các SKU có trong data payload
      ...skusToUpdate.map((sku) =>
        this.prismaService.sKU.update({
          where: {
            id: sku.id as number,
          },
          data: {
            value: sku.value,
            price: sku.price,
            stock: sku.stock,
            images: sku.images,
            updatedById,
          },
        }),
      ),

      this.prismaService.sKU.createMany({
        data: skusToCreate,
      }),
    ]);

    return {
      message: ' Sửa Sản Phẩm Thành Công',
    };
  }

  async delete(
    {
      id,
      deletedById,
    }: {
      id: number;
      deletedById: number;
    },
    isHard?: boolean,
  ) {
    if (isHard) {
      return this.prismaService.product.delete({
        where: {
          id,
        },
      });
    }
    const now = new Date();
    const [product] = await Promise.all([
      this.prismaService.product.update({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          deletedAt: now,
          deletedById,
        },
      }),
      this.prismaService.sKU.updateMany({
        where: {
          productId: id,
          deletedAt: null,
        },
        data: {
          deletedAt: now,
          deletedById,
        },
      }),
    ]);
    return product;
  }
}
