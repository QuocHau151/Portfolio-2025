import { createZodDto } from 'nestjs-zod';
import { MessageResSchema } from '../models/response.model';
import { z } from 'zod';

export class MessageResDTO extends createZodDto(
  z.object({
    data: MessageResSchema,
    statusCode: z.number(),
  }),
) {}
