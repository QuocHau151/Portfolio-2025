import { Role } from "@/constants/type";

import z from "zod";

export const ClientLoginBody = z
  .object({
    name: z.string().min(2).max(50),
    tableNumber: z.number(),
    token: z.string(),
  })
  .strict();

export type ClientLoginBodyType = z.TypeOf<typeof ClientLoginBody>;

export const ClientLoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    client: z.object({
      id: z.number(),
      name: z.string(),
      role: z.enum([Role.Client]),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  }),
  message: z.string(),
});

export type ClientLoginResType = z.TypeOf<typeof ClientLoginRes>;
