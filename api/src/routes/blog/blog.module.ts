import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepo } from './blog.repo';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogRepo],
})
export class BlogModule {}
