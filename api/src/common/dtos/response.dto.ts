import { createZodDto } from 'nestjs-zod';
import { BooleanResSchema, MessageResSchema } from '../models/response.model';
import { z } from 'zod';

export class MessageResDTO extends createZodDto(
  z.object({
    data: MessageResSchema,
  }),
) {}

export class BooleanResDTO extends createZodDto(
  z.object({
    data: BooleanResSchema,
  }),
) {}
