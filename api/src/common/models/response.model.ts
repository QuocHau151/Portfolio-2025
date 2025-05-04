import { z } from 'zod';

export const MessageResSchema = z.object({
  message: z.string(),
});

export type MessageResType = z.infer<typeof MessageResSchema>;

export const BooleanResSchema = z.object({
  message: z.boolean(),
});

export type BooleanResType = z.infer<typeof BooleanResSchema>;
