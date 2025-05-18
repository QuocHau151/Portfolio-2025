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
import { IsPublic } from 'src/common/decorators/auth.decorator';
import { PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import {
  CreateBrandBodyDTO,
  GetBrandDetailResDTO,
  GetBrandParamsDTO,
  GetBrandsResDTO,
  UpdateBrandBodyDTO,
} from 'src/routes/brand/brand.dto';
import { BrandService } from 'src/routes/brand/brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @IsPublic()
  @ZodSerializerDto(GetBrandsResDTO)
  list(@Query() query: PaginationQueryDTO) {
    return this.brandService.list(query);
  }

  @Get(':brandId')
  @IsPublic()
  @ZodSerializerDto(GetBrandDetailResDTO)
  findById(@Param() params: GetBrandParamsDTO) {
    return this.brandService.findById(params.brandId);
  }

  @Post()
  @ZodSerializerDto(MessageResDTO)
  create(
    @Body() body: CreateBrandBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.create({
      data: body,
      createdById: userId,
    });
  }

  @Put(':brandId')
  @ZodSerializerDto(MessageResDTO)
  update(
    @Body() body: UpdateBrandBodyDTO,
    @Param() params: GetBrandParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.update({
      data: body,
      id: params.brandId,
      updatedById: userId,
    });
  }

  @Delete(':brandId')
  @ZodSerializerDto(MessageResDTO)
  delete(
    @Param() params: GetBrandParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.delete({
      id: params.brandId,
      deletedById: userId,
    });
  }
}
