import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { IsPublic } from 'src/common/decorators/auth.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import {
  CreateCategoryBodyDTO,
  GetAllCategoriesResDTO,
  GetCategoryDetailResDTO,
  GetCategoryParamsDTO,
  UpdateCategoryBodyDTO,
} from 'src/routes/category/category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @IsPublic()
  @ZodSerializerDto(GetAllCategoriesResDTO)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':categoryId')
  @IsPublic()
  @ZodSerializerDto(GetCategoryDetailResDTO)
  findById(@Param() params: GetCategoryParamsDTO) {
    return this.categoryService.findById(params.categoryId);
  }

  @Post()
  @ZodSerializerDto(MessageResDTO)
  create(
    @Body() body: CreateCategoryBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.create({
      data: body,
      createdById: userId,
    });
  }

  @Put(':categoryId')
  @ZodSerializerDto(MessageResDTO)
  update(
    @Body() body: UpdateCategoryBodyDTO,
    @Param() params: GetCategoryParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.update({
      data: body,
      id: params.categoryId,
      updatedById: userId,
    });
  }

  @Delete(':categoryId')
  @ZodSerializerDto(MessageResDTO)
  delete(
    @Param() params: GetCategoryParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.delete({
      id: params.categoryId,
      deletedById: userId,
    });
  }
}
