import { Injectable } from '@nestjs/common';
import { BlogRepo } from './blog.repo';
import {
  CreateBlogBodyType,
  CreateCategoryBodyBlogType,
  UpdateBlogType,
} from './blog.model';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepo: BlogRepo) {}
  getBlogs() {
    return this.blogRepo.getBlogs();
  }
  getBlogById(id: number) {
    return this.blogRepo.getBlogById(id);
  }
  getAuthorBlogById(id: number) {
    return this.blogRepo.getAuthorBlogById(id);
  }
  createBlog(body: CreateBlogBodyType, userId: number) {
    return this.blogRepo.createBlog(body, userId);
  }
  createCaegoryBlog(body: CreateCategoryBodyBlogType, userId: number) {
    return this.blogRepo.createCategoryBlog(body, userId);
  }
  updateBlog(body: UpdateBlogType, userId: number, id: number) {
    return this.blogRepo.updateBlog(body, userId, id);
  }
  deleteBlog(id: number) {
    return this.blogRepo.deleteBlog(id);
  }
  getCategoryBlogs() {
    return this.blogRepo.getCategoryBlogs();
  }
  getCategoryBlogById(id: number) {
    return this.blogRepo.getCategoryBlogById(id);
  }
  updateBlogCategory(
    body: CreateCategoryBodyBlogType,
    userId: number,
    id: number,
  ) {
    return this.blogRepo.updateBlogCategory(body, userId, id);
  }
  deleteBlogCategory(id: number) {
    return this.blogRepo.deleteBlogCategory(id);
  }
}
