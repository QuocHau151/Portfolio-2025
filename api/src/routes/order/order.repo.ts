import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus, Prisma } from '@prisma/client';
import { isNotFoundPrismaError } from 'src/common/helpers';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  CannotCancelOrderException,
  NotFoundCartItemException,
  OrderNotFoundException,
  OutOfStockSKUException,
  ProductNotFoundException,
} from 'src/routes/order/order.error';
import {
  CreateOrderBodyType,
  GetOrderListQueryType,
} from 'src/routes/order/order.model';
import { OrderProducer } from 'src/routes/order/order.producer';

@Injectable()
export class OrderRepo {
  constructor(
    private readonly prismaService: PrismaService,
    private orderProducer: OrderProducer,
  ) {}
  async list(userId: number, query: GetOrderListQueryType) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;
    const take = limit;
    const where: Prisma.OrderWhereInput = {
      userId,
      status,
    };

    // Đếm tổng số order
    const totalItem$ = this.prismaService.order.count({
      where,
    });
    // Lấy list order
    const data$ = await this.prismaService.order.findMany({
      where,
      include: {
        items: true,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const [data, totalItems] = await Promise.all([data$, totalItem$]);
    return {
      data,
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    };
  }

  async create(userId: number, body: CreateOrderBodyType) {
    // 1. Kiểm tra xem tất cả cartItemIds có tồn tại trong cơ sở dữ liệu hay không
    // 2. Kiểm tra số lượng mua có lớn hơn số lượng tồn kho hay không
    // 3. Kiểm tra xem tất cả sản phẩm mua có sản phẩm nào bị xóa hay ẩn không
    // 4. Kiểm tra xem các skuId trong cartItem gửi lên có thuộc về shopid gửi lên không
    // 5. Tạo order
    // 6. Xóa cartItem
    const allBodyCartItemIds = body.map((item) => item.cartItemIds).flat();
    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        id: {
          in: allBodyCartItemIds,
        },
        userId,
      },
      include: {
        sku: {
          include: {
            product: true,
          },
        },
      },
    });

    // 1. Kiểm tra xem tất cả cartItemIds có tồn tại trong cơ sở dữ liệu hay không
    if (cartItems.length !== allBodyCartItemIds.length) {
      throw NotFoundCartItemException;
    }

    // 2. Kiểm tra số lượng mua có lớn hơn số lượng tồn kho hay không
    const isOutOfStock = cartItems.some((item) => {
      return item.sku.stock < item.quantity;
    });
    if (isOutOfStock) {
      throw OutOfStockSKUException;
    }

    // 3. Kiểm tra xem tất cả sản phẩm mua có sản phẩm nào bị xóa hay ẩn không
    const isExistNotReadyProduct = cartItems.some(
      (item) =>
        item.sku.product.deletedAt !== null ||
        item.sku.product.publishedAt === null ||
        item.sku.product.publishedAt > new Date(),
    );
    if (isExistNotReadyProduct) {
      throw ProductNotFoundException;
    }
    const cartItemMap = new Map<number, (typeof cartItems)[0]>();
    cartItems.forEach((item) => {
      cartItemMap.set(item.id, item);
    });
    // 5. Tạo order và xóa cartItem trong transaction để đảm bảo tính toàn vẹn dữ liệu
    const [paymentId, orders] = await this.prismaService.$transaction(
      async (tx) => {
        const payment = await tx.payment.create({
          data: {
            status: PaymentStatus.PENDING,
            userId,
          },
        });
        const orders$ = Promise.all(
          body.map((item) =>
            tx.order.create({
              data: {
                userId,
                status: OrderStatus.PENDING_PAYMENT,
                receiver: item.receiver,
                createdById: userId,
                paymentId: payment.id,
                items: {
                  create: item.cartItemIds.map((cartItemId) => {
                    const cartItem = cartItemMap.get(cartItemId)!;
                    return {
                      productName: cartItem.sku.product.name,
                      skuPrice: cartItem.sku.price,
                      image: cartItem.sku.images[0],
                      skuId: cartItem.sku.id,
                      skuValue: cartItem.sku.value,
                      quantity: cartItem.quantity,
                      productId: cartItem.sku.product.id,
                    };
                  }),
                },
                products: {
                  connect: item.cartItemIds.map((cartItemId) => {
                    const cartItem = cartItemMap.get(cartItemId)!;
                    return {
                      id: cartItem.sku.product.id,
                    };
                  }),
                },
              },
            }),
          ),
        );
        const cartItem$ = tx.cartItem.deleteMany({
          where: {
            id: {
              in: allBodyCartItemIds,
            },
          },
        });
        const sku$ = Promise.all(
          cartItems.map((item) =>
            tx.sKU.update({
              where: {
                id: item.sku.id,
              },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            }),
          ),
        );
        const addCancelPaymentJob$ = this.orderProducer.addCancelPaymentJob(
          payment.id,
        );
        const [orders] = await Promise.all([
          orders$,
          cartItem$,
          sku$,
          addCancelPaymentJob$,
        ]);

        return [payment.id, orders];
      },
    );
    return {
      paymentId,
      orders,
    };
  }

  async detail(userId: number, orderid: number) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderid,
        userId,
        deletedAt: null,
      },
      include: {
        items: true,
      },
    });
    if (!order) {
      throw OrderNotFoundException;
    }
    return order;
  }

  async cancel(userId: number, orderId: number) {
    try {
      const order = await this.prismaService.order.findUniqueOrThrow({
        where: {
          id: orderId,
          userId,
          deletedAt: null,
        },
      });
      if (order.status !== OrderStatus.PENDING_PAYMENT) {
        throw CannotCancelOrderException;
      }
      const updatedOrder = await this.prismaService.order.update({
        where: {
          id: orderId,
          userId,
          deletedAt: null,
        },
        data: {
          status: OrderStatus.CANCELLED,
          updatedById: userId,
        },
      });
      return updatedOrder;
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw OrderNotFoundException;
      }
      throw error;
    }
  }
}
