import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleName } from 'src/common/constants/role.constant';
import { NotFoundRecordException } from 'src/common/error';
import { isNotFoundPrismaError } from 'src/common/helpers';
import {
  CreateProductBodyType,
  GetManageProductsQueryType,
  UpdateProductBodyType,
} from 'src/routes/product/product.model';
import { ProductRepo } from 'src/routes/product/product.repo';

@Injectable()
export class ManageProductService {
  constructor(private productRepo: ProductRepo) {}

  /**
   * Kiểm tra nếu người dùng không phải là người tạo sản phẩm hoặc admin thì không cho tiếp tục
   */
  validatePrivilege({
    userIdRequest,
    roleNameRequest,
    createdById,
  }: {
    userIdRequest: number;
    roleNameRequest: string;
    createdById: number | undefined | null;
  }) {
    if (userIdRequest !== createdById && roleNameRequest !== RoleName.Admin) {
      throw new ForbiddenException();
    }
    return true;
  }

  /**
   * @description: Xem danh sách sản phẩm của một shop, bắt buộc phải truyền query param là `createdById`
   */
  async list(props: {
    query: GetManageProductsQueryType;
    userIdRequest: number;
    roleNameRequest: string;
  }) {
    this.validatePrivilege({
      userIdRequest: props.userIdRequest,
      roleNameRequest: props.roleNameRequest,
      createdById: props.query.createdById,
    });
    const data = await this.productRepo.list({
      page: props.query.page,
      limit: props.query.limit,
      createdById: props.query.createdById,
      isPublic: props.query.isPublic,
      brands: props.query.brands,
      minPrice: props.query.minPrice,
      maxPrice: props.query.maxPrice,
      categories: props.query.categories,
      name: props.query.name,
      orderBy: props.query.orderBy,
      sortBy: props.query.sortBy,
    });
    return data;
  }

  async getDetail(props: {
    productId: number;
    userIdRequest: number;
    roleNameRequest: string;
  }) {
    const product = await this.productRepo.getDetail({
      productId: props.productId,
    });

    if (!product) {
      throw NotFoundRecordException;
    }
    this.validatePrivilege({
      userIdRequest: props.userIdRequest,
      roleNameRequest: props.roleNameRequest,
      createdById: product.createdById,
    });
    return product;
  }

  create({
    data,
    createdById,
  }: {
    data: CreateProductBodyType;
    createdById: number;
  }) {
    return this.productRepo.create({
      createdById,
      data,
    });
  }

  async update({
    productId,
    data,
    updatedById,
    roleNameRequest,
  }: {
    productId: number;
    data: UpdateProductBodyType;
    updatedById: number;
    roleNameRequest: string;
  }) {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw NotFoundRecordException;
    }
    this.validatePrivilege({
      userIdRequest: updatedById,
      roleNameRequest,
      createdById: product.createdById,
    });
    try {
      const updatedProduct = await this.productRepo.update({
        id: productId,
        updatedById,
        data,
      });
      return updatedProduct;
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }

  async delete({
    productId,
    deletedById,
    roleNameRequest,
  }: {
    productId: number;
    deletedById: number;
    roleNameRequest: string;
  }) {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw NotFoundRecordException;
    }
    this.validatePrivilege({
      userIdRequest: deletedById,
      roleNameRequest,
      createdById: product.createdById,
    });
    try {
      await this.productRepo.delete({
        id: productId,
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
