import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.number(),
  userId: z.number(),
  roomName: z.string(),
  content: z.string(),
  readAt: z.date().optional(),
  createdAt: z.date(),
});
export const CreateMessageBodySchema = MessageSchema.omit({
  id: true,
  readAt: true,
  createdAt: true,
}).strict();
export type MessageSchemaType = z.infer<typeof MessageSchema>;
export type CreateMessageBodyType = z.infer<typeof CreateMessageBodySchema>;
