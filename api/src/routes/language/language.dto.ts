import { createZodDto } from 'nestjs-zod';
import {
  CreateLanguageBodySchema,
  GetLanguageDetailResSchema,
  GetLanguageParamsSchema,
  GetLanguagesResSchema,
  UpdateLanguageBodySchema,
} from 'src/routes/language/language.model';
import { z } from 'zod';

export class GetLanguagesResDTO extends createZodDto(
  z.object({
    data: GetLanguagesResSchema,
    statusCode: z.number(),
  }),
) {}

export class GetLanguageParamsDTO extends createZodDto(
  GetLanguageParamsSchema,
) {}

export class GetLanguageDetailResDTO extends createZodDto(
  z.object({
    data: GetLanguageDetailResSchema,
    statusCode: z.number(),
  }),
) {}

export class CreateLanguageBodyDTO extends createZodDto(
  CreateLanguageBodySchema,
) {}

export class UpdateLanguageBodyDTO extends createZodDto(
  UpdateLanguageBodySchema,
) {}
