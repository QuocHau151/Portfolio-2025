import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { AccessTokenPayload } from 'src/common/types/jwt.types';
import {
  CreateProductBodyDTO,
  GetManageProductsQueryDTO,
  GetProductDetailResDTO,
  GetProductParamsDTO,
  GetProductsResDTO,
  UpdateProductBodyDTO,
} from 'src/routes/product/product.dto';
import { ManageProductService } from './manage-product.service';

@Controller('manage-product/products')
export class ManageProductController {
  constructor(private readonly manageProductService: ManageProductService) {}

  @Get()
  @ZodSerializerDto(GetProductsResDTO)
  list(
    @Query() query: GetManageProductsQueryDTO,
    @ActiveUser() user: AccessTokenPayload,
  ) {
    return this.manageProductService.list({
      query,
      roleNameRequest: user.roleName,
      userIdRequest: user.userId,
    });
  }

  @Get(':productId')
  @ZodSerializerDto(GetProductDetailResDTO)
  findById(
    @Param() params: GetProductParamsDTO,
    @ActiveUser() user: AccessTokenPayload,
  ) {
    return this.manageProductService.getDetail({
      productId: params.productId,
      roleNameRequest: user.roleName,
      userIdRequest: user.userId,
    });
  }

  @Post()
  @ZodSerializerDto(MessageResDTO)
  create(
    @Body() body: CreateProductBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.manageProductService.create({
      data: body,
      createdById: userId,
    });
  }

  @Put(':productId')
  @ZodSerializerDto(MessageResDTO)
  update(
    @Body() body: UpdateProductBodyDTO,
    @Param() params: GetProductParamsDTO,
    @ActiveUser() user: AccessTokenPayload,
  ) {
    return this.manageProductService.update({
      data: body,
      productId: params.productId,
      updatedById: user.userId,
      roleNameRequest: user.roleName,
    });
  }

  @Delete(':productId')
  @ZodSerializerDto(MessageResDTO)
  delete(
    @Param() params: GetProductParamsDTO,
    @ActiveUser() user: AccessTokenPayload,
  ) {
    return this.manageProductService.delete({
      productId: params.productId,
      deletedById: user.userId,
      roleNameRequest: user.roleName,
    });
  }
}
