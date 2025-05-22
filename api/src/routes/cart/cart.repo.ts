import { Injectable } from '@nestjs/common';
import { isNotFoundPrismaError } from 'src/common/helpers';
import { SKUSchemaType } from 'src/common/models/common-sku.model';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  InvalidQuantityException,
  NotFoundCartItemException,
  NotFoundSKUException,
  OutOfStockSKUException,
  ProductNotFoundException,
} from 'src/routes/cart/cart.error';
import {
  AddToCartBodyType,
  CartItemType,
  DeleteCartBodyType,
  UpdateCartItemBodyType,
} from 'src/routes/cart/cart.model';

@Injectable()
export class CartRepo {
  constructor(private readonly prismaService: PrismaService) {}

  private async validateSKU({
    skuId,
    quantity,
    userId,
    isCreate,
  }: {
    skuId: number;
    quantity: number;
    userId: number;
    isCreate: boolean;
  }): Promise<SKUSchemaType> {
    const [cartItem, sku] = await Promise.all([
      this.prismaService.cartItem.findUnique({
        where: {
          userId_skuId: {
            userId,
            skuId,
          },
        },
      }),
      this.prismaService.sKU.findUnique({
        where: { id: skuId, deletedAt: null },
        include: {
          product: true,
        },
      }),
    ]);
    // Kiểm tra tồn tại của SKU
    if (!sku) {
      throw NotFoundSKUException;
    }
    if (cartItem && isCreate && quantity + cartItem.quantity > sku.stock) {
      throw InvalidQuantityException;
    }
    // Kiểm tra lượng hàng còn lại
    if (sku.stock < 1 || sku.stock < quantity) {
      throw OutOfStockSKUException;
    }
    const { product } = sku;

    // Kiểm tra sản phẩm đã bị xóa hoặc có công khai hay không
    if (
      product.deletedAt !== null ||
      product.publishedAt === null ||
      (product.publishedAt !== null && product.publishedAt > new Date())
    ) {
      throw ProductNotFoundException;
    }
    return sku;
  }
  async list({
    userId,
    page,
    limit,
  }: {
    userId: number;
    limit: number;
    page: number;
  }) {
    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        userId,
        sku: {
          product: {
            deletedAt: null,
            publishedAt: {
              lte: new Date(),
              not: null,
            },
          },
        },
      },
      include: {
        sku: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                publishedAt: true,
                basePrice: true,
                virtualPrice: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return {
      data: cartItems,
      limit,
      page,
      totalPages: Math.ceil(cartItems.length / limit),
    };
  }

  async create(userId: number, body: AddToCartBodyType): Promise<CartItemType> {
    await this.validateSKU({
      skuId: body.skuId,
      quantity: body.quantity,
      userId,
      isCreate: true,
    });

    return this.prismaService.cartItem.upsert({
      where: {
        userId_skuId: {
          userId,
          skuId: body.skuId,
        },
      },
      update: {
        quantity: {
          increment: body.quantity,
        },
      },
      create: {
        userId,
        skuId: body.skuId,
        quantity: body.quantity,
      },
    });
  }

  async update({
    userId,
    body,
    cartItemId,
  }: {
    userId: number;
    cartItemId: number;
    body: UpdateCartItemBodyType;
  }): Promise<CartItemType> {
    await this.validateSKU({
      skuId: body.skuId,
      quantity: body.quantity,
      userId,
      isCreate: false,
    });

    return this.prismaService.cartItem
      .update({
        where: {
          id: cartItemId,
          userId,
        },
        data: {
          skuId: body.skuId,
          quantity: body.quantity,
        },
      })
      .catch((error) => {
        if (isNotFoundPrismaError(error)) {
          throw NotFoundCartItemException;
        }
        throw error;
      });
  }

  delete(userId: number, body: DeleteCartBodyType): Promise<{ count: number }> {
    return this.prismaService.cartItem.deleteMany({
      where: {
        id: {
          in: body.cartItemIds,
        },
        userId,
      },
    });
  }
}
