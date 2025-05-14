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
import { CreateBlogBodyDTO, CreateCategoryBlogDTO } from './blog.dto';
import { UpdateBlogCategoryBodyType, UpdateBlogType } from './blog.model';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get('author')
  getBlogsByAuthor(@ActiveUser('userId') userId: number) {
    console.log(userId);
    return this.blogService.getBlogsByAuthor(userId);
  }

  @Get('category')
  @IsPublic()
  getCategoryBlogs() {
    return this.blogService.getCategoryBlogs();
  }

  @Get()
  @IsPublic()
  getBlogs() {
    return this.blogService.getBlogs();
  }

  @Get(':id')
  @IsPublic()
  getBlog(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }
  @Post('create')
  @ZodSerializerDto(MessageResDTO)
  createBlog(
    @Body() body: CreateBlogBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.blogService.createBlog(body, userId);
  }

  @Put(':id')
  @ZodSerializerDto(MessageResDTO)
  updateBlog(
    @Body() body: UpdateBlogType,
    @ActiveUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return this.blogService.updateBlog(body, userId, id);
  }

  @Delete(':id')
  @ZodSerializerDto(MessageResDTO)
  deleteBlog(@Param('id') id: number) {
    return this.blogService.deleteBlog(id);
  }

  @Post('category')
  @ZodSerializerDto(MessageResDTO)
  createCategoryBlog(
    @Body() body: CreateCategoryBlogDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.blogService.createCaegoryBlog(body, userId);
  }

  @Get('category/:id')
  @IsPublic()
  getCategoryBlogById(@Param('id') id: number) {
    return this.blogService.getCategoryBlogById(id);
  }
  @Put('category/:id')
  @ZodSerializerDto(MessageResDTO)
  updateCategoryBlog(
    @Body() body: UpdateBlogCategoryBodyType,
    @ActiveUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return this.blogService.updateBlogCategory(body, userId, id);
  }
  @Delete('category/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteCategoryBlog(@Param('id') id: number) {
    return this.blogService.deleteBlogCategory(id);
  }
  @Get('author/:id')
  @IsPublic()
  getAuthorBlogById(@Param('id') id: number) {
    return this.blogService.getAuthorBlogById(id);
  }
}
