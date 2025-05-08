import { createZodDto } from 'nestjs-zod';
import {
  CreateBlogBodySchema,
  CreateCategoryBlogBodySchema,
} from './blog.model';

export class CreateBlogBodyDTO extends createZodDto(CreateBlogBodySchema) {}
export class CreateCategoryBlogDTO extends createZodDto(
  CreateCategoryBlogBodySchema,
) {}
