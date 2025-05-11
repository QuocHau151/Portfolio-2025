import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateBlogBodyType, CreateCategoryBodyBlogType } from './blog.model';

@Injectable()
export class BlogRepo {
  constructor(private prismaService: PrismaService) {}
  async getBlogs() {
    const result = await this.prismaService.blog.findMany();
    return result;
  }
  async getBlogById(id: number) {
    const result = await this.prismaService.blog.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!result) {
      throw new UnprocessableEntityException({
        message: 'Blog Không Tồn Tại',
      });
    }
    return result;
  }
  async createBlog(body: CreateBlogBodyType, userId: number) {
    const result = await this.prismaService.blog.create({
      data: {
        ...body,
        authorId: userId,
      },
    });
    if (!result) {
      throw new UnprocessableEntityException({
        message: 'Tạo Blog Thất Bại',
      });
    }
    return {
      message: 'Tạo Blog Thành Công',
    };
  }
  async createCategoryBlog(body: CreateCategoryBodyBlogType, userId: number) {
    await this.prismaService.categoryBlog.create({
      data: {
        ...body,
        createdById: userId,
      },
    });
    return {
      message: 'Tạo Danh Mục Blog Thành Công',
    };
  }
  async updateBlog(body: CreateBlogBodyType, userId: number, id: number) {
    await this.prismaService.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        ...body,
        authorId: userId,
      },
    });
    return {
      message: 'Cập Nhật Blog Thành Công',
    };
  }
  async deleteBlog(id: number) {
    await this.prismaService.blog.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Xóa Blog Thành Công',
    };
  }
  async getCategoryBlogs() {
    return await this.prismaService.categoryBlog.findMany();
  }
  async getCategoryBlogById(id: number) {
    const result = await this.prismaService.categoryBlog.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!result) {
      throw new UnprocessableEntityException({
        message: 'Danh Mục Blog Không Tồn Tại',
      });
    }
    return result;
  }
  async updateBlogCategory(
    body: CreateCategoryBodyBlogType,
    userId: number,
    id: number,
  ) {
    await this.prismaService.categoryBlog.update({
      where: {
        id: Number(id),
      },
      data: {
        ...body,
        createdById: userId,
      },
    });
    return {
      message: 'Cập Nhật Danh Mục Blog Thành Công',
    };
  }
  async deleteBlogCategory(id: number) {
    await this.prismaService.categoryBlog.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Xóa Danh Mục Blog Thành Công',
    };
  }
  async getAuthorBlogById(id: number) {
    const result = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return {
      name: result?.name,
    };
  }
}
